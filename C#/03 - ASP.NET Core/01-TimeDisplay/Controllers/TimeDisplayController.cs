using System;
using Microsoft.AspNetCore.Mvc;

namespace TimeDisplay.Controllers
{
    public class TimeDisplayController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            // Oct 26, 2013 11:26 AM
            string date = DateTime.Now.ToString("MMM dd, yyyy");
            string time = DateTime.Now.ToString("hh:mm tt");

            ViewBag.CurrentDate = date;
            ViewBag.CurrentTime = time;

            return View();
        }
    }
}