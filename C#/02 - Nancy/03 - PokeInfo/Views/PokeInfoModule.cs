using System;
using System.Collections.Generic;
using Nancy;
using Newtonsoft.Json;
using ApiCaller;

namespace PokeInfo
{
    public class PokeInfoModule : NancyModule
    {
        private Random rnd = new Random();

        public PokeInfoModule()
        {
            Get("/{id}", async args =>
            {
                int id = args.id > 0 ? args.id : 1;
                string url = String.Format("http://pokeapi.co/api/v2/pokemon/{0}", id);

                string Name = "";
                dynamic Type = null;
                int Height = 0;
                int Weight = 0;
                dynamic Sprite = null;

                await WebRequest.SendRequest(url,
                    new Action<Dictionary<string, object>>( JsonResponse => {
                        Name = (string) JsonResponse["name"];
                        Type = JsonResponse["types"];
                        Height = (int) (Int64) JsonResponse["height"];
                        Weight = (int) (Int64) JsonResponse["weight"];
                        Sprite = JsonResponse["sprites"];
                    }
                ));

                string types = "";
                foreach( var type in Type ) {
                    types += type.type.name + ", ";
                }

                ViewBag["name"] = Name;
                ViewBag["type"] = types.Remove(types.Length - 2);
                ViewBag["height"] = Height;
                ViewBag["weight"] = Weight;
                ViewBag["sprite"] = Sprite.front_default;

                return View["index", Type];
            });
        }
    }
}