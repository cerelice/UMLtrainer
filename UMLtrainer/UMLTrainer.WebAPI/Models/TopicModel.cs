using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UMLTrainer.Domain;

namespace UMLTrainer.WebAPI.Models
{
    public class TopicModel
    {
        public Topic Topic { get; set; }

        public IEnumerable<Test> Tests { get; set; }

        public Task Diagram { get; set; }
    }
}