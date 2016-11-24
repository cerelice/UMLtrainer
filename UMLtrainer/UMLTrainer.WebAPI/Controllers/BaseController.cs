using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using UMLTrainer.Domain;

namespace UMLTrainer.WebAPI.Controllers
{
    public class BaseController : ApiController
    {
        protected readonly UMLTrainerEntities DbProvider;

        public BaseController()
        {
            this.DbProvider = new UMLTrainerEntities();
        }
    }
}