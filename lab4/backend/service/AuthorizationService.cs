using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace Ztm;

public class AuthorizationService {

	private readonly UserService userService;

	public AuthorizationService(UserService userService) {
		this.userService = userService;
	}

	public string GenerateToken(string username) {
		var securityKey = new SymmetricSecurityKey(Program.KEY);//RandomKey.GenerateKey());
		var credentials =
			new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

		var claims = new[] {
			new Claim(ClaimTypes.NameIdentifier, username)
		};

		return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
			Program.ADDRESS,
			Program.ADDRESS,
			claims,
			expires: DateTime.Now.AddHours(1),
			signingCredentials: credentials));
	}

	public UserEntity? GetCurrentUser(HttpContext context) {
		var identity = context.User.Identity as ClaimsIdentity;

		if(identity != null) {
			var userClaims = identity.Claims;
			var username = userClaims
				.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)
				?.Value;
			if(username != null) {
				return userService.FindByUsername(username);
			}
		}

		return null;
	}
}