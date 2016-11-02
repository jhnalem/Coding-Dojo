using System;
using System.Collections.Generic;
using Nancy;
using Newtonsoft.Json;
using ApiCaller;
using DbConnection;

namespace QuotingDojo
{
    public class QuotingDojoModule : NancyModule
    {
        public QuotingDojoModule()
        {
            Get("/", _ =>
            {
                if( Session["error"] != null ) {
                    ViewBag.hasError = true;
                    ViewBag.error = Session["error"];
                    Session.Delete("error");
                }

                return View["index"];
            });

            Get("/quotes", _ =>
            {
                string query = "SELECT id, name, quote, likes, DATE_FORMAT(created_at, '%r %M %D, %Y') AS created_at FROM quotes  ORDER BY likes DESC";
                var results = DbConnector.ExecuteQuery(query);

                return View["quotes", results];
            });

            Get("/like/{id}", args =>
            {
                string query = String.Format("UPDATE quotes SET likes=likes+1 WHERE id={0}", args.id);

                DbConnector.ExecuteQuery(query);

                return Response.AsRedirect("/quotes");
            });

            Post("/submit", _ =>
            {
                string name = Request.Form.name;
                string quote = Request.Form.quote;

                if (name.Length < 1 || quote.Length < 1) {
                    Session["error"] = "You must fill out both fields!";
                    return Response.AsRedirect("/");
                }

                string query = String.Format("INSERT INTO quotes (name, quote, created_at) VALUES ('{0}', '{1}', NOW())", name, quote);
                DbConnector.ExecuteQuery(query);

                return Response.AsRedirect("/quotes");
            });
        }
    }
}