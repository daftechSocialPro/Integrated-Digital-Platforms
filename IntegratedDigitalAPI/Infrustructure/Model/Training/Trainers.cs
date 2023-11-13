using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class Trainers :WithIdModel
    {

        public Guid TrainingId { get; set; }
        public Training Training { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public bool IsEmailSent { get; set; }


    }
}
