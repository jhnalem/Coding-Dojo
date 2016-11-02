using System;
using System.Collections.Generic;
using Nancy;

namespace NinjaGold
{
    public class NinjaGoldModule : NancyModule
    {
        private Random rnd = new Random();

        public NinjaGoldModule()
        {
            Get("/", _ =>
            {
                if (Session["gold"] == null)
                {
                    Session["gold"] = 0;
                    Session["activities"] = new List<string>();
                }

                ViewBag["gold"] = Session["gold"];

                return View["index", Session["activities"]];
            });

            Post("/process_money", _ =>
            {
                int min;
                int max;
                string location = Request.Form.location;

                switch (location)
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
                var acts = Session["activities"] as List<string>;
                string time = DateTime.Now.ToString("yyyy/MM/dd hh:mm tt");

                Session["gold"] = (int) Session["gold"] + rand;

                if( rand < 0 ) {
                    acts.Add($"Entered a {location} and lost {rand} golds! Ouch... ({time})\n");
                } else {
                    acts.Add($"Earned {rand} golds from the {location}! ({time})\n");
                }

                return Response.AsRedirect("/");
            });

            Post("/reset", _ => {
                Session.DeleteAll();

                return Response.AsRedirect("/");
            });
        }
    }
}