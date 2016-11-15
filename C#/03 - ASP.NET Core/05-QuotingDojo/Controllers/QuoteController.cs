using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuotingDojo.Models;
using DapperApp.Factory;

namespace QuotingDojo.Controllers
{
    public class QuoteController : Controller
    {
        private readonly QuoteFactory quoteFactory;

        public QuoteController()
        {
            quoteFactory = new QuoteFactory();
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            ViewBag.errors = new List<Dictionary<object, string>>();
            return View();
        }

        [HttpGet]
        [Route("quotes")]
        public IActionResult Quotes()
        {
            return View(quoteFactory.FindAll());
        }

        [HttpGet]
        [Route("like/{Id}")]
        public IActionResult Like(int Id)
        {
            quoteFactory.Like(Id);
            return RedirectToAction("Quotes");
        }

        [HttpPost]
        [Route("quote")]
        public IActionResult Process(Quote NewQuote)
        {
            if (ModelState.IsValid)
            {
                quoteFactory.Add(NewQuote);
                return RedirectToAction("Quotes");
            }
            else
            {
                ViewBag.Errors = ModelState.Values;
                return View("Index");
            }

        }
    }
}
