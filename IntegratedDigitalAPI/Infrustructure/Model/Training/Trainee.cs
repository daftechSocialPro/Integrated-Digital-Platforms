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
    public class Trainee 
    {
        public Guid Id { get; set; }
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public int  Age { get; set; }
        public string Email { get; set; }        
        public string EducationalField { get; set; }
        public string NameofOrganizaton { get; set; }
        public string TypeofOrganization { get; set; }

        public Guid RegionId { get; set; }
        public virtual Region Region { get; set; }


        public string Zone { get; set; }
        public string Woreda { get; set; }


        public Guid EducationalLevelId { get; set; }
        public virtual EducationalLevel EducationalLevel { get; set; }

        public string Profession { get; set; }

        public Gender Gender { get; set; }

        public string ? PreSummary { get; set; }

        public string ? PostSummary { get; set; }

    }
}
