using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using UMLTrainer.Domain;

namespace UMLTrainer.WebAPI.Controllers
{
    [RoutePrefix("api/tasks")]
    public class TaskController : BaseController
    {
        [HttpGet]
        [Route("all")]
        public IEnumerable<Task> GetAll()
        {
            return this.DbProvider.Tasks;
        }

        [HttpGet]
        [Route("id")]
        public Task GetBeId(string id)
        {
            return this.DbProvider.Tasks.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        [Route("add")]
        public void Post(Task task)
        {
            if (task == null)
            {
                throw new ArgumentNullException("task");
            }

            this.DbProvider.Tasks.Add(task);
        }

        [HttpPost]
        [Route("result")]
        public void AddResult(TaskResult result)
        {
            if (result == null)
            {
                throw new ArgumentNullException("result");
            }

            this.DbProvider.TaskResults.Add(result);
        }
    }
}