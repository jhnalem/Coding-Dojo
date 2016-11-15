using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RandomWord.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            var count = HttpContext.Session.GetInt32("Counter");
            var str = HttpContext.Session.GetString("Random");

            if (count == null)
            {
                count = 1;
            }

            if (str == null)
            {
                str = RandomString(14);
            }

            ViewBag.Counter = count;
            ViewBag.Random = str;

            return View();
        }

        [HttpPost]
        [Route("generate")]
        public IActionResult Gen()
        {
            var count = HttpContext.Session.GetInt32("Counter");

            if (count == null)
            {
                count = 0;
            }

            HttpContext.Session.SetInt32("Counter", (int)count + 1);
            HttpContext.Session.SetString("Random", RandomString(14));

            return RedirectToAction("Index");
        }

        private static Random random = new Random();
        private static string RandomString(int length)
        {
            // http://stackoverflow.com/a/1344242
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
