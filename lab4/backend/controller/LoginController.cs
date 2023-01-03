using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Ztm;

[ApiController]
public class LoginController : ControllerBase {
	private readonly UserService userService;
	private readonly AuthorizationService authorizationService;

	public LoginController(UserService userService, AuthorizationService authorizationService) {
		this.userService = userService;
		this.authorizationService = authorizationService;
	}

	[HttpPost]
	[Route("/api/login")]
	[AllowAnonymous]
	public JsonResult Login(LoginRequest req) {
		UserEntity? user = userService.FindByUsername(req.username);
		if(user == null) {
			return new JsonResult(NotFound());
		}

		if(user.password != req.password) {
			return new JsonResult(NotFound());
		}

		return new JsonResult(new LoginResponse() {
			username = user.username,
			id =user.id,
			token = "Bearer " + authorizationService.GenerateToken(req.username)
		});
	}
}