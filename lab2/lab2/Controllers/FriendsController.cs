using System.Text;
using lab2.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace lab2.Controllers {

	[Route("/Friends")]
	public class FriendsController : Controller {
		
		public static readonly UserRepository users = UserController.users;
		
		[Route("AddView/{name}")]
		public ActionResult AddView(string name) {
			ViewBag.user = name;
			return View("~/Pages/Friends/AddView.cshtml");
		}
		
		[Route("ImportExportView/{name}")]
		public ActionResult ImportExportView(string name) {
			ViewBag.user = name;
			return View("~/Pages/Friends/ImportExportView.cshtml");
		}

		[HttpGet]
		public IActionResult Index(string name) {
			User user = users.GetUser(name);
			if(user != null) {
				return Json(new {
					friends = user.friends.ToList().ConvertAll(x => x.name)
						.ToArray()
				});
			}

			return Json(null);
		}
		
		
		[Route("Add/{name}")]
		public ActionResult Add(string name, string friend) {
			bool v = users.AddFriend(name, friend);
			return Json(new { value = v });
		}

		[Route("Del/{name}")]
		public ActionResult Del(string name, string friend) {
			Console.WriteLine("Friends Del: " + name + " -> friend: " + friend);
			bool v = users.DeleteFriend(name, friend);
			return Json(new { value = v });
		}




		[Route("Export")]
		public ActionResult ExportFriends(string name) {
			User user = users.GetUser(name);
			if(user != null) {
				string s = JsonConvert.SerializeObject(new {
					friends = user.friends.ToList().ConvertAll(x => x.name)
						.ToArray()
				});
				byte[] bytes = Encoding.UTF8.GetBytes(s);

				Console.WriteLine(s);

				return File(bytes, "application/json", "friends.json");
			}

			return Json(null);
		}

		[Route("Import")]
		public ActionResult ImportFriends(string name, IFormFile file) {

			if(file == null) {
				return Json(new { value = false });
			}

			MemoryStream ms = new();
			file.CopyTo(ms);
			var b = ms.GetBuffer();

			var s = Encoding.UTF8.GetString(b);

			var bb = JsonConvert.DeserializeObject(s) as JObject;
			var x = bb.GetValue("friends");

			users.DeleteFriends(name);
			
			User user = users.GetUser(name);
			if(user == null) {
				return Json(new { value = false });
			}

			foreach(string f in x) {
				users.AddFriend(name, f);
			}

			return Json(new { value = true });
			/*
			Console.WriteLine(friends);
			var j = Json(new { friends });
			return j;
			*/
			/*
			Console.WriteLine(j.ToString());
			User user = users.GetUser(name);
			if(user != null) {
				//var j = Json(new { friends = user.friends.ToList().ConvertAll(x=>x.name).ToArray() });
			}
			return Json(null);
			*/
		}
	}
}
