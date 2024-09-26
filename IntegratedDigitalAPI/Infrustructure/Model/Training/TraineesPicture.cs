using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class TraineesPicture : WithIdModel
    {
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }
        public string ImagePath { get; set; }
    }
}
