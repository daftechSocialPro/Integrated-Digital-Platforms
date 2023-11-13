using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Training
{
    public class Training : WithIdModel
    {

        public string Title { get; set; }

        public string NameofOrganizaton { get; set; }

        public string TypeofOrganization { get; set; }

        public string CourseVenue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }   

        public string Project { get; set; }


        public ReportStatus ReportStatus { get; set; }

        public TraineeListStatus TraineeListStatus { get; set;}

    }
}
