using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UMLtrainer.WebClient.Controllers
{
    public class CommonController : Controller
    {
        // GET: /<controller>/
        public IActionResult Loading()
        {
            return View();
        }

        public IActionResult Menu()
        {
            return View();
        }
    }
}
