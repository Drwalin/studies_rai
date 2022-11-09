using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Unicode;
using System.Web.Helpers;
using System.Web;
using System.Web.Mvc;
using lab2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace lab2.Controllers {
	[Route("/User")]
	public class UserController : Controller {

		public static readonly UserRepository users = new();

		
		[Route("AddView")]
		public ActionResult AddView() {
			return View("~/Pages/User/AddView.cshtml");
		}
		
		[Route("Add")]
		public ActionResult Add(string admin, string name) {
			var v = (admin == "admin") ? users.AddUser(name) : false;
			ViewBag.user = users.GetUser("admin");
			return View("~/Pages/User/LoginUser.cshtml");
			//return Json(new { value = v });
		}

		[Route("Del")]
		public ActionResult Del(string admin, string name) {
			var v = (admin == "admin") ? users.DeleteUser(name) : false;
			return Json(new { value = v });
		}

		[Route("List")]
		public ActionResult List(string admin) {
			var v = (admin == "admin") ? users.ListUsers().ConvertAll(x=>x.name).ToArray() : null;
			return Json(new { users = v });
		}
		
		
		
		

		[Route("Login")]
		public ActionResult Login(string name) {
			User user = users.GetUser(name);
			if(user != null) {
				ViewBag.user = user;
			//	if(name == "admin") {
			//		return View("~/Pages/User/LoginAdmin.cshtml");
			//	} else {
					return View("~/Pages/User/LoginUser.cshtml");
			//	}
			}

			ViewBag.userName = name;
			return View("~/Pages/User/LoginFailed.cshtml");
		}
		

		[Route("Logout")]
		public ActionResult Logout(string name) {
			User user = users.GetUser(name);
			if(user != null) {
				ViewBag.user = user;
				return View("~/Pages/User/Logout.cshtml");
			}

			ViewBag.userName = name;
			return View("~/Pages/User/LogoutFailed.cshtml");
		}
		
		
		

		
	}
}
