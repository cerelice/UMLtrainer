using System.Linq;
using System.Web.Http;
using UMLTrainer.Domain;
using UMLTrainer.Domain.Models;

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
        public TaskResult GetTaskResultById(int id)
        {
            return this.DbProvider.TaskResults.FirstOrDefault(x => x.Id == id);
        }

        [HttpGet]
        [Route("id")]
        public TestResult GetTestResultById(int id)
        {
            return this.DbProvider.TestResults.FirstOrDefault(x => x.Id == id);
        }
    }
}