using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Training
{
    public record TrainingPostDto
    {

        public Guid ? Id { get; set; }
        public Guid ActivityId { get;set; }
        public string Title { get; set; } = null!;

        public string CourseVenue { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
     

        public string AllocatedCEU { get; set; }
        public string CreatedById { get; set; } = null!;
    }

    public record TrainingGetDto
    {
        public Guid Id { get; set; }

        public Guid ActivityId { get; set; }

        public string ActivityNumber { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string NameofOrganizaton { get; set; } = null!;
        public string TypeofOrganization { get; set; } = null!;
        public string CourseVenue { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Project { get; set; } = null!;
        public string AllocatedCEU { get; set; }
        public string ReportStatus { get; set; } = null!;

        public string TraineeListStatus { get; set; } = null!;



    }


    public record AllTraineeReportDto
    {

        public string FullName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Profession { get; set; }
        public string LevelOfEducation { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Region { get; set; }
        public string Zone { get; set; }
        public string Woreda { get; set; }
       
        public string NameofOrganizaton { get; set; } = null!;
        public string TypeofOrganization { get; set; } = null!;

        public double PreTrainingSummary { get; set; }

        public double PostTrainingSummary { get; set; }
        public string Title { get; set; } = null!;
        public string CourseVenue { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Project { get; set; } = null!;
        public string AllocatedCEU { get; set; }
   }
}
