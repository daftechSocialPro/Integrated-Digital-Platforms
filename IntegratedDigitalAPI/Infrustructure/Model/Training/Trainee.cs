using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Training
{
    public class Trainee : WithIdModel
    {
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        
        public Guid EducationalFieldId { get; set; }
        public virtual EducationalField EducationalField { get; set; }

        public Guid EducationalLevelId { get; set; }
        public virtual EducationalLevel EducationalLevel { get; set; }

        public Gender Gender { get; set; }

    }
}
