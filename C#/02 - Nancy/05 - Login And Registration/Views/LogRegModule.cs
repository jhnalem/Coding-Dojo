using System;
using System.Collections.Generic;
// for regex
using System.Text.RegularExpressions;
// for validating email
using System.ComponentModel.DataAnnotations;
using Nancy;
using Newtonsoft.Json;
using ApiCaller;
using DbConnection;
using CryptoHelper;

namespace LogReg
{
    public class LogRegModule : NancyModule
    {
        public LogRegModule()
        {
            Get("/", _ =>
            {
                if( Session["user"] == null ) {
                    Session["errors"] = new List<string> {"Please log in"};
                    return Response.AsRedirect("/login");
                }

                int id = (int) Session["user"];

                string query = String.Format("SELECT * FROM users WHERE id={0}", id);

                ViewBag["user"] = DbConnector.ExecuteQuery(query)[0];

                return View["index"];
            });

            Get("/login", _ =>
            {
                if( Session["user"] != null ) {
                    return Response.AsRedirect("/");
                }

                List<string> errors = null;

                if (Session["errors"] != null)
                {
                    errors = Session["errors"] as List<string>;
                    Session.Delete("errors");
                }

                if (errors != null && errors.Count > 0)
                {
                    ViewBag.hasErrors = true;
                }

                return View["login", errors];
            });

            Get("/register", _ =>
            {
                if( Session["user"] != null ) {
                    return Response.AsRedirect("/");
                }

                List<string> errors = null;

                if (Session["errors"] != null)
                {
                    errors = Session["errors"] as List<string>;
                    Session.Delete("errors");
                }

                if (errors != null && errors.Count > 0)
                {
                    ViewBag.hasErrors = true;
                }

                return View["/register", errors];
            });

            Post("/logout", _ =>
            {
                Session.Delete("user");
                return Response.AsRedirect("/login");
            });

            Post("/login", _ =>
            {
                if( Session["user"] != null ) {
                    return Response.AsRedirect("/");
                }

                string email = Request.Form.email;
                string pass = Request.Form.password;

                string query = String.Format("SELECT id, password FROM users WHERE email='{0}'", email);
                var result = DbConnector.ExecuteQuery(query);

                List<string> errors = new List<string>();

                if (email == null || email.Length < 1)
                {
                    errors.Add("You must enter an email.");
                }

                if (pass == null || pass.Length < 1)
                {
                    errors.Add("You must enter a password.");
                }
                else if (!Crypto.VerifyHashedPassword((string) result[0]["password"], pass))
                {
                    errors.Add("The password you entered is incorrect.");
                }

                Session.Delete("isError");
                Session.Delete("errors");
                Session.Delete("isSuccess");
                Session.Delete("success");

                if (errors.Count > 0)
                {
                    Session["isError"] = true;
                    Session["errors"] = errors;
                    return Response.AsRedirect("/login");
                }
                else
                {
                    Session["isSuccess"] = true;
                    Session["success"] = "Successfully logged in!";
                    Session["user"] = result[0]["id"];

                    return Response.AsRedirect("/");
                }
            });

            Post("/register", _ =>
            {
                if( Session["user"] != null ) {
                    return Response.AsRedirect("/");
                }

                string fname = Request.Form.firstName;
                string lname = Request.Form.lastName;
                string email = Request.Form.email;
                string passw = Request.Form.password;
                string cpass = Request.Form.confirmPassword;

                List<string> errors = new List<string>();

                if (fname == null || fname.Length < 1)
                {
                    errors.Add("You must provide a first name.");
                }
                else if (fname.Length < 2)
                {
                    errors.Add("First name must be at least 2 characters.");
                }
                else if(!(Regex.IsMatch(fname, @"^[a-zA-Z]+$")))
                {
                    errors.Add("First name cannot contain anything but letters.");
                }

                if (lname == null || lname.Length < 1)
                {
                    errors.Add("You must provide a last name.");
                }
                else if (lname.Length < 2)
                {
                    errors.Add("Last name must be at least 2 characters.");
                }
                else if(!(Regex.IsMatch(lname, @"^[a-zA-Z]+$")))
                {
                    errors.Add("Last name cannot contain anything but letters.");
                }

                if (email == null || email.Length < 1)
                {
                    errors.Add("You must provide an email.");
                }
                else if (!(new EmailAddressAttribute().IsValid(email)))
                {
                    errors.Add("The entered email is invalid.");
                }

                if (passw == null || passw.Length < 1)
                {
                    errors.Add("You must enter a password.");
                }

                if (passw != cpass)
                {
                    errors.Add("The passwords do not match!");
                }

                if (errors.Count > 0)
                {
                    Session["errors"] = errors;
                    return Response.AsRedirect("/register");
                }
                else
                {
                    string password = Crypto.HashPassword(passw);
                    string query = String.Format("INSERT INTO users (first_name, last_name, email, password) VALUES ('{0}', '{1}', '{2}', '{3}')", fname, lname, email, password);
                    DbConnector.ExecuteQuery(query);

                    Session["success"] = "Successfully created account!";

                    return Response.AsRedirect("/login");
                }
            });
        }
    }
}