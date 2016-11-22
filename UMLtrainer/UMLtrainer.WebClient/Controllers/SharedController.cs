using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UMLtrainer.WebClient.Controllers
{
    public class SharedController : Controller
    {
        // GET: /<controller>/
        public IActionResult BaseMenu()
        {
            return View();
        }
    }
}
