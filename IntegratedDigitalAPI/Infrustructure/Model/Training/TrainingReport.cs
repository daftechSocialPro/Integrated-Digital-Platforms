using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Vacancy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class TrainingReport 
    {
        public TrainingReport()
        {
            ReportAttachments = new HashSet<TrainingReportAttachment>();
        }

        [Key]
        public Guid Id { get; set; }

        public DateTime CreatedDate { get; set; }
        public Guid TrainingId { get; set; }
        public Training Training { get; set; }

        public string Objective { get; set; }

        public string Contribution { get; set; }

        public string TraineesDescription { get; set; }

        public string TopicsCoverd { get; set; }

        public string Challenges { get; set; }

        public string LessonsLearned { get; set; }

        public string Summary { get; set; }

        public string PrePostSummary { get; set; }

       


        [InverseProperty(nameof(TrainingReportAttachment.TrainingReport))]
        public ICollection<TrainingReportAttachment> ReportAttachments { get; set; }

    }
}
