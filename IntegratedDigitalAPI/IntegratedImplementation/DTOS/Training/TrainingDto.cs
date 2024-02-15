using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Training
{
    public record TrainingPostDto
    {

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
}
