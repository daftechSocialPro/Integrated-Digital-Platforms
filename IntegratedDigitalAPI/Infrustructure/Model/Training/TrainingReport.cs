using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class TrainingReport : WithIdModel
    {
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }

        public string Contribution { get; set; }

        public string TraineesDescription { get; set; }

        public string TopicsCoverd { get; set; }

        public string Challenges { get; set; }

        public string LessonsLearned { get; set; }

        public string Summary { get; set; }

    }
}
