using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuotingDojoRedux.Factory;
using QuotingDojoRedux.Models;

namespace QuotingDojoRedux.Controllers
{
    public class MainController : Controller
    {
        private readonly UserFactory userFactory;
        private readonly QuoteFactory quoteFactory;

        public MainController(UserFactory UF, QuoteFactory QF)
        {
            userFactory = UF;
            quoteFactory = QF;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            if (HttpContext.Session.GetInt32("User") != null)
            {
                ViewBag.User = userFactory.FindByID((int)HttpContext.Session.GetInt32("User"));
            }
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = new List<string>();
            return View();
        }

        [HttpGet]
        [Route("login")]
        public IActionResult GetLogin()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = new List<string>();
            return View("Login");
        }

        [HttpPost]
        [Route("login")]
        public IActionResult PostLogin(string Email, string Password)
        {
            if (Email != null && Password != null)
            {
                var Hasher = new PasswordHasher<User>();
                User user = userFactory.FindByEmail(Email);

                if(user != null && Hasher.VerifyHashedPassword(user, user.Password, Password) != 0)
                {
                    HttpContext.Session.SetInt32("User", user.Id);
                    TempData["Success"] = "Successfully logged in!";
                    return RedirectToAction("Index");
                }
                else {
                    ViewBag.Error = new List<string> {"Unable to login!"};
                    return View("Login");
                }
            }
            else {
                ViewBag.Error = new List<string> {"Both fields require an entry to login."};
                return View("Login");
            }
        }

        [HttpGet]
        [Route("register")]
        public IActionResult GetRegister()
        {
            ViewBag.Error = new List<string>();
            return View("Register");
        }

        [HttpPost]
        [Route("register")]
        public IActionResult PostRegister(Register user)
        {
            if (ModelState.IsValid)
            {
                PasswordHasher<User> Hasher = new PasswordHasher<User>();

                User data = new User();
                data.FirstName = user.FirstName;
                data.LastName = user.LastName;
                data.Email = user.Email;
                data.Password = Hasher.HashPassword(data, user.Password);

                userFactory.Add(data);

                TempData["Success"] = "Successfully created your account!";
                return RedirectToAction("GetLogin");
            }
            else {
                ViewBag.Error = ModelState.Values;
                return View("Register");
            }
        }

        [HttpGet]
        [Route("quotes")]
        public IActionResult GetQuotes()
        {
            ViewBag.UserId = HttpContext.Session.GetInt32("User");
            ViewBag.Quotes = quoteFactory.FindAll();
            return View("Quotes");
        }

        [HttpPost]
        [Route("quotes")]
        public IActionResult PostQuotes(Quote quote)
        {
            var UserId = HttpContext.Session.GetInt32("User");
            if (UserId == null)
            {
                return RedirectToAction("Index");
            }

            var user = userFactory.FindByID((int)UserId);

            if (ModelState.IsValid)
            {
                quote.User = user;
                quoteFactory.Add(quote);
                return RedirectToAction("GetQuotes");
            }
            else
            {
                ViewBag.Errors = ModelState.Values;
                return View("Index");
            }
        }

        [HttpGet]
        [Route("like/{Id}")]
        public IActionResult LikeQuote(int Id)
        {
            quoteFactory.Like(Id);
            return RedirectToAction("GetQuotes");
        }

        [HttpGet]
        [Route("delete/{Id}")]
        public IActionResult DeleteQuote(int Id)
        {
            quoteFactory.Delete(Id);
            return RedirectToAction("GetQuotes");
        }
    }
}
