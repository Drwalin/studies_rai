using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ztm;

[ApiController]
public class UserController : ControllerBase {
    private readonly UserService userService;
    private readonly AuthorizationService authorizationService;

    public UserController(UserService userService,
        AuthorizationService authorizationService) {
        this.userService = userService;
        this.authorizationService = authorizationService;
    }

    [HttpPost]
    [Route("/api/users")]
    [AllowAnonymous]
    public JsonResult CreateUser(CreateUserRequest req) {
        if(userService.FindByUsername(req.username) != null) {
            return new JsonResult(HttpStatusCode.Conflict);
        }

        userService.Create(new UserEntity()
            { username = req.username, password = req.password });
        return new JsonResult(HttpStatusCode.Accepted);
    }

    [HttpDelete]
    [Route("/api/users/{id}")]
    [Authorize]
    public JsonResult DeleteUser(int id) {
        UserEntity? loggedInUser =
            authorizationService.GetCurrentUser(HttpContext);
        if(loggedInUser == null) {
            return new JsonResult(HttpStatusCode.Unauthorized);
        }

        UserEntity? user = userService.FindById(id);
        if(user == null) {
            return new JsonResult(HttpStatusCode.NotFound);
        }

        if(loggedInUser.id != user.id) {
            return new JsonResult(HttpStatusCode.Unauthorized);
        }

        userService.Delete(user);
        return new JsonResult(HttpStatusCode.Accepted);
    }
}