using Microsoft.AspNetCore.Mvc;

namespace ASPCore.Controllers
{
    public class HelloController : Controller
    {
        [HttpGet]
        [Route("RouteName")]
        public IActionResult Index()
        {
            return View();
            //OR
            return View("Index");
            //Both of these returns will render the same view
        }
    }
}