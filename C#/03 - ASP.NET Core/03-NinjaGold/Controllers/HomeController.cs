using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NinjaGold.Controllers
{

    public class HomeController : Controller
    {
        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var acts = HttpContext.Session.GetObjectFromJson<List<string>>("Activities");
            var gold = HttpContext.Session.GetInt32("Gold");

            if (acts == null)
            {
                acts = new List<string>();
            }

            if (gold == null)
            {
                gold = 0;
            }

            ViewBag.Activities = acts;
            ViewBag.Gold = gold;

            return View();
        }

        [HttpPost]
        [Route("process_money")]
        public IActionResult Process(string Location)
        {
            int min;
            int max;
            Random rnd = new Random();

            switch (Location)
            {
                case "farm":
                    min = 10;
                    max = 20;
                    break;

                case "cave":
                    min = 5;
                    max = 10;
                    break;

                case "house":
                    min = 2;
                    max = 5;
                    break;

                case "casino":
                    min = -50;
                    max = 50;
                    break;

                default:
                    min = 0;
                    max = 0;
                    break;
            }

            int rand = rnd.Next(min, max+1);
            string time = DateTime.Now.ToString("yyyy/MM/dd hh:mm tt");
            var acts = HttpContext.Session.GetObjectFromJson<List<string>>("Activities");
            if (acts == null)
            {
                acts = new List<string>();
            }

            var CurrentGold = HttpContext.Session.GetInt32("Gold");
            if (CurrentGold == null)
            {
                CurrentGold = 0;
            }

            if (rand < 0)
            {
                acts.Insert(0, $"<p class=\"lose\">Entered a {Location} and lost {rand} golds! Ouch... ({time})</p>");
            }
            else
            {
                acts.Insert(0, $"<p class=\"win\">Earned {rand} golds from the {Location}! ({time})</p>");
            }

            HttpContext.Session.SetInt32("Gold", (int)CurrentGold + rand);
            HttpContext.Session.SetObjectAsJson("Activities", acts);

            return RedirectToAction("Index");
        }
    }
    public static class SessionExtensions
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }
        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }
}
