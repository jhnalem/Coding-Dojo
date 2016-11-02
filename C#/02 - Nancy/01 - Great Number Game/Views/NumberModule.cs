using System;
using Nancy;
namespace NumberGame
{
    public class NumberModule : NancyModule
    {
        public NumberModule()
        {
            Get("/", args =>
            {
                if (Session["randNum"] == null)
                {
                    Session["randNum"] = new Random().Next(1,101);
                    ViewBag.isCorrect = false;
                    ViewBag.message = "";
                }

                ViewBag.randNum = Session["randNum"];

                if (Session["success"] != null)
                {
                    ViewBag.isCorrect = true;
                    ViewBag.message = Session["success"];
                }
                else if (Session["error"] != null)
                {
                    ViewBag.isCorrect = false;
                    ViewBag.message = Session["error"];
                }

                return View["index"];
            });

            Post("/submit", args =>
            {
                if (Session["randNum"] != null)
                {
                    int sess = (int) Session["randNum"];
                    int number = Request.Form.Number;

                    Session.Delete("error");
                    Session.Delete("success");

                    if (sess < number)
                    {
                        Session["error"] = "Too high!";
                    }
                    else if (sess > number)
                    {
                        Session["error"] = "Too low!";
                    }
                    else
                    {
                        Session["success"] = String.Format("{0} was the correct number!", number);
                    }
                }
                else
                {
                    Session["error"] = "Enter a number!";
                }

                return Response.AsRedirect("/");
            });

            Post("/reset", args =>
            {
                Session.DeleteAll();

                return Response.AsRedirect("/");
            });
        }
    }
}