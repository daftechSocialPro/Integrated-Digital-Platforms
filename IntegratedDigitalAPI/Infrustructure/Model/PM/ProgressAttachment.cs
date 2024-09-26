using IntegratedInfrustructure.Model.Authentication;

namespace IntegratedInfrustructure.Models.PM
{
    public class ProgressAttachment : WithIdModel
    {

        public Guid ActivityProgressId { get; set; }
        public virtual ActivityProgress ActivityProgress { get; set; } = null!;
        public string FilePath { get; set; } = null!;
    }
}
