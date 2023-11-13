using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class ActivityTraining :WithIdModel
    {
        public Guid TrainingId { get; set; }

        public Training Training { get; set;}


        public Guid ActivityId { get; set; }

        public Activity Activity { get; set; }
    }
}
