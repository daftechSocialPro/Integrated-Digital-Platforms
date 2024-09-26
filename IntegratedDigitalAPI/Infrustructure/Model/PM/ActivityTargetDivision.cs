using IntegratedInfrustructure.Model.Authentication;

namespace IntegratedInfrustructure.Models.PM
{
   public class ActivityTargetDivision : WithIdModel
    {
        public Guid ActivityId { get; set; }
        public virtual Activity? Activity { get; set; } = null!;
        public float Target { get; set; }
        public float TargetBudget { get; set; }
        public int Order { get; set; }       
        public int Year { get; set; }
    }

    
}
