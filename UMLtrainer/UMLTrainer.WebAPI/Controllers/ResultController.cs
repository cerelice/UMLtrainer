using System.Linq;
using System.Web.Http;
using UMLTrainer.Domain;
using UMLTrainer.WebAPI.Models;

namespace UMLTrainer.WebAPI.Controllers
{
    [RoutePrefix("api/results")]
    public class ResultController : BaseController
    {
        [HttpGet]
        [Route("all")]
        public ResultModel GetAll()
        {
            return new ResultModel
            {
                TaskResults = this.DbProvider.TaskResults,
                TestResults = this.DbProvider.TestResults
            };
        }

        [HttpGet]
        [Route("id")]
        public TaskResult GetTaskResultById(string id)
        {
            return this.DbProvider.TaskResults.FirstOrDefault(x => x.Id == id);
        }

        [HttpGet]
        [Route("id")]
        public TestResult GetTestResultById(string id)
        {
            return this.DbProvider.TestResults.FirstOrDefault(x => x.Id == id);
        }
    }
}