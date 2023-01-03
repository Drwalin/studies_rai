using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ztm;

[ApiController]
public class StopController : ControllerBase {
    private readonly StopService stopService;
    private readonly UserStopService userStopService;
	private readonly AuthorizationService authorizationService;

    public StopController(StopService stopService,
        UserStopService userStopService, AuthorizationService authorizationService) {
        this.stopService = stopService;
        this.userStopService = userStopService;
        this.authorizationService = authorizationService;
    }

    [HttpGet]
    [Route("/api/stops")]
    [AllowAnonymous]
    public JsonResult GetAllStops() {
        return new JsonResult(stopService.FindAllStops().Result);
    }

    [HttpGet]
    [Route("/api/users/current/favouritestops")]
    [Authorize]
    public JsonResult GetUserFavouriteStops() {
        UserEntity user = authorizationService.GetCurrentUser(HttpContext);
        if(user == null) {
            return new JsonResult(NotFound());
        }

        List<UserStopEntity> userStops = userStopService.FindAllUserStops(user);
        List<int> ids = userStops.ConvertAll(s => s.stopId).ToList();
        List<ZtmStop> ztmStops = stopService.FindStopsByIds(ids).Result;

        return new JsonResult(ztmStops);
    }

    [HttpGet]
    [Route("/api/arrivals/{stopId}")]
    [AllowAnonymous]
    public JsonResult GetStopArrivals(int stopId) {
        ZtmArrivalsList? list = stopService.FindArrivalsByStopId(stopId).Result;
        return new JsonResult(list);
    }

    [HttpPost]
    [Route("/api/users/current/stops/{stopId}")]
    [Authorize]
    public JsonResult AddFavouriteStop(int stopId) {
        UserEntity? user = authorizationService.GetCurrentUser(HttpContext);
        if(user == null) {
            return new JsonResult(NotFound());
        }

        userStopService.AddUserStop(new UserStopEntity() {
            stopId = stopId,
            user = user
        });

        return new JsonResult(Ok());
    }

    [HttpDelete]
    [Route("/api/users/current/stops/{stopId}")]
    [Authorize]
    public JsonResult DeleteFavouriteStop(int stopId) {
        UserEntity user = authorizationService.GetCurrentUser(HttpContext);
        if(user == null) {
            return new JsonResult(NotFound());
        }

        UserStopEntity? stop =
            userStopService.FindByStopIdAndUser(stopId, user);
        
        if(stop == null) {
            return new JsonResult(NotFound());
        }

        userStopService.RemoveUserStop(stop);

        return new JsonResult(Ok());
    }
}