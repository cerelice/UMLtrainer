using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using UMLTrainer.Domain;
using UMLTrainer.Domain.Models;

namespace UMLTrainer.WebAPI.Controllers
{
    [RoutePrefix("api/topics")]
    public class TopicController : BaseController
    {
        [HttpGet]
        [Route("all")]
        public IEnumerable<TopicModel> GetAll()
        {
            var result = new List<TopicModel>();
            foreach(var topic in this.DbProvider.Topics)
            {
                result.Add(new TopicModel
                {
                    Topic = topic,
                    Tests = this.DbProvider.Tests
                        .Join(
                            this.DbProvider.TestForTopics,
                            c => c.Id,
                            cm => cm.TestId,
                            (c, cm) => new { Test = c, TestForTopic = cm })
                        .Where(x => x.TestForTopic.TopicId == topic.Id).Select(x => x.Test),
                    Task = this.DbProvider.Tasks.FirstOrDefault(x => x.TopicId == topic.Id)
                });
            }

            return result;
        }

        [HttpGet]
        [Route("id")]
        public TopicModel GetBeId(int id)
        {
            return new TopicModel
            {
                Topic = this.DbProvider.Topics.FirstOrDefault(x => x.Id == id),
                Tests = this.DbProvider.Tests
                        .Join(
                            this.DbProvider.TestForTopics,
                            c => c.Id,
                            cm => cm.TestId,
                            (c, cm) => new { Test = c, TestForTopic = cm })
                        .Where(x => x.TestForTopic.TopicId == id).Select(x => x.Test),
                Task = this.DbProvider.Tasks.FirstOrDefault(x => x.TopicId == id)
            };
        }

        [HttpPost]
        [Route("add")]
        public Topic Post(Topic topic)
        {
            if (topic == null)
            {
                throw new ArgumentNullException("topic");
            }

            return this.DbProvider.Save(topic);
        }

        [HttpPost]
        [Route("add")]
        public Topic Post(Topic topic)
        {
            if (topic == null)
            {
                throw new ArgumentNullException("topic");
            }

            return this.DbProvider.Save(topic);
        }
    }
}