using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Training
{
    public record TrainingReportGetDto
    {
        public Guid Id { get; set; }
        public string Objective { get; set; }

        public string Contribution { get; set; }

        public string TraineesDescription { get; set; }

        public string TopicsCoverd { get; set; }

        public string Challenges { get; set; }

        public string LessonsLearned { get; set; }

        public string Summary { get; set; }

        public string PrePostSummary { get; set; }
    }

    public record TrainingReportPostDto
    {
      public  Guid? Id { get; set; }
        public Guid TrainingId { get; set; }
        public string Objective { get; set; }

        public string Contribution { get; set; }

        public string TraineesDescription { get; set; }

        public string TopicsCoverd { get; set; }

        public string Challenges { get; set; }

        public string LessonsLearned { get; set; }

        public string Summary { get; set; }

        public string PrePostSummary { get; set; }

        

        public string ReportStatus { get; set; }

    }

}
