using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using UMLTrainer.Domain;

namespace UMLTrainer.WebAPI.Controllers
{
    [RoutePrefix("api/tests")]
    public class TestController : BaseController
    {
        [HttpGet]
        [Route("all")]
        public IEnumerable<Test> GetAll()
        {
            return this.DbProvider.Tests;
        }

        [HttpGet]
        [Route("id")]
        public Test GetBeId(int id)
        {
            return this.DbProvider.Tests.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        [Route("add")]
        public void Post(Test test)
        {
            if (test == null)
            {
                throw new ArgumentNullException("test");
            }

            this.DbProvider.Tests.Add(test);
        }

        [HttpPost]
        [Route("result")]
        public TestResult AddResult(TestResult result)
        {
            if (result == null)
            {
                throw new ArgumentNullException("result");
            }

            this.DbProvider.TestResults.Add(result);

            return result;
        }
    }
}