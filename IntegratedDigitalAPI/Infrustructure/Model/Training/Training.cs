using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.PM;
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

        public Guid ActivityId { get; set; }

        public Activity Activity { get; set; }

        public string Title { get; set; }

      
        public string CourseVenue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }   

        public Guid? ProjectId { get; set; }

        public virtual Project Project { get; set; }

        public string? AllocatedCEU { get; set; }


        public ReportStatus ReportStatus { get; set; }

        public TraineeListStatus TraineeListStatus { get; set;}

    }
}
