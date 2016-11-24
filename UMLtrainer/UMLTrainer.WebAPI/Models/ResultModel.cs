using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UMLTrainer.Domain;

namespace UMLTrainer.WebAPI.Models
{
    public class ResultModel
    {
        public IEnumerable<TestResult> TestResults { get; set; }

        public IEnumerable<TaskResult> TaskResults { get; set; }
    }
}