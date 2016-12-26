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
        public Task GetBeId(int id)
        {
            return this.DbProvider.Tasks.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        [Route("add")]
        public Task Post(Task task)
        {
            if (task == null)
            {
                throw new ArgumentNullException("task");
            }

            this.DbProvider.Tasks.Add(task);
            this.DbProvider.SaveChanges();

            return task;
        }

        [HttpPost]
        [Route("result")]
        public TaskResult AddResult(TaskResult result)
        {
            if (result == null)
            {
                throw new ArgumentNullException("result");
            }

            this.DbProvider.TaskResults.Add(result);

            return result;
        }
    }
}