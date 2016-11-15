using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using LogReg.Factory;
using LogReg.Models;

namespace LogReg.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountFactory accFactory;

        public AccountController(AccountFactory account)
        {
            accFactory = account;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = "";

            var id = HttpContext.Session.GetInt32("User");
            if (id == null)
            {
                return RedirectToAction("GetLogin");
            } else {
                ViewBag.User = accFactory.FindByID((int)id);
                return View();
            }
        }

        [HttpGet]
        [Route("login")]
        public IActionResult GetLogin()
        {
            ViewBag.Success = TempData["Success"];
            ViewBag.Error = "";

            return View("Login");
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
                PasswordHasher<Account> Hasher = new PasswordHasher<Account>();

                Account data = new Account();
                data.FirstName = user.FirstName;
                data.LastName = user.LastName;
                data.Email = user.Email;
                data.Password = Hasher.HashPassword(data, user.Password);

                accFactory.Add(data);

                TempData["Success"] = "Successfully created your account!";
                return RedirectToAction("GetLogin");
            }
            else {
                ViewBag.Error = ModelState.Values;
                return View("Register");
            }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult PostLogin(string Email, string Password)
        {
            if (Email != null && Password != null)
            {
                var Hasher = new PasswordHasher<Account>();
                Account user = accFactory.FindByEmail(Email);

                if(user != null && Hasher.VerifyHashedPassword(user, user.Password, Password) != 0)
                {
                    HttpContext.Session.SetInt32("User", user.Id);
                    TempData["Success"] = "Successfully logged in!";
                    return RedirectToAction("Index");
                }
                else {
                    ViewBag.Error = "Unable to login!";
                    return View("Login");
                }
            }
            else {
                ViewBag.Error = "Both fields require an entry to login.";
                return View("Login");
            }
        }
    }
}
