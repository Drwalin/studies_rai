using System.Net.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Ztm;

class Program {
	public static readonly string ADDRESS = "https://localhost:8080/";
	public static readonly byte[] KEY = RandomKey.GenerateKey();

	public static void Main(String[] args) {
		var builder = WebApplication.CreateBuilder(args);

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer()
			.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new OpenApiInfo {
					Title = "JWTToken_Auth_API", Version = "v1"
				});
				c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme() {
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey,
					Scheme = "Bearer",
					BearerFormat = "JWT",
					In = ParameterLocation.Header,
					Description =
						"JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
				});
				c.AddSecurityRequirement(new OpenApiSecurityRequirement {
					{
						new OpenApiSecurityScheme {
							Reference = new OpenApiReference {
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							}
						},
						new string[] { }
					}
				});
			})
			.AddDbContext<ZtmDbContext>()
			.AddScoped<UserRepository>()
			.AddScoped<UserStopRepository>()
			.AddScoped<StopService>()
			.AddScoped<UserService>()
			.AddScoped<UserStopService>()
			.AddScoped<AuthorizationService>()

			.AddAuthentication(options => {
				options.DefaultAuthenticateScheme =
					JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme =
					JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options => {
				options.SaveToken = true;
				options.RequireHttpsMetadata = false;
				options.TokenValidationParameters =
					new TokenValidationParameters() {
						ValidateIssuer = false,
						ValidateAudience = false,
						ValidateLifetime = true,
						ValidIssuer = ADDRESS,
						ValidAudience = ADDRESS,
						IssuerSigningKey =
							AuthorizationService.securityKey
					};
			});
		builder.Services.AddMvc();

		var app = builder.Build();
		app.UseAuthentication()
			.UseAuthorization()
			.UseSwagger()
			.UseSwaggerUI();
		app.MapControllers();
		app.Services.GetService<ZtmDbContext>().Database.EnsureCreated();

		app.Run();
	}
}