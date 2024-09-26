using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Training
{
    public class TrainingReportAttachment
    {
        public Guid Id { get; set; }
        public virtual TrainingReport TrainingReport { get; set; }
        public Guid TrainingReportId { get; set; }
        public string FilePath { get; set; }

        public FileType FileType { get; set; }
    }

    public enum FileType
    {
        ATTACHMENT,
        IMAGES        
    }


    
}
