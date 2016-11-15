using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheWall.Factories;
using TheWall.Models;

namespace TheWall.Controllers
{
    public class WallController : Controller
    {
        private readonly WallFactory wallFactory;
        private readonly UserFactory userFactory;

        public WallController(WallFactory wf, UserFactory uf)
        {
            wallFactory = wf;
            userFactory = uf;
        }

        [HttpGet]
        [Route("wall")]
        public IActionResult Wall()
        {
            int? userId = HttpContext.Session.GetInt32("User");
            if (userId == null)
            {
                return RedirectToAction("Account", "User");
            }

            ViewBag.User = userFactory.FindByID((int)userId);
            ViewBag.Messages = wallFactory.FindAll();

            return View();
        }

        [HttpPost]
        [Route("postMessage")]
        public IActionResult PostMessage(String message)
        {
            int? user = HttpContext.Session.GetInt32("User");
            if( user == null)
            {
                return RedirectToAction("Account", "User");
            }
            if (message != null)
            {
                Message msg = new Message {
                    Text = message,
                    User = userFactory.FindByID((int)user)
                };

                wallFactory.AddMessage(msg);

                return RedirectToAction("Wall");
            }
            else
            {
                return RedirectToAction("Wall");
            }
        }

        [HttpPost]
        [Route("postComment/{Id}")]
        public IActionResult PostComment(Comment comment, int Id)
        {
            int? user = HttpContext.Session.GetInt32("User");
            if( user == null)
            {
                return RedirectToAction("Account", "User");
            }

            if (ModelState.IsValid)
            {
                comment.User = userFactory.FindByID((int)user);
                comment.Message = wallFactory.FindMessageById(Id);
                wallFactory.AddComment(comment);
                return RedirectToAction("Wall");
            }
            else
            {
                return RedirectToAction("Wall");
            }
        }
    }
}
