

using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.PM;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Common
{
    public class Indicator : WithIdModel
    {
        public string Name { get; set; } = null!;

        public Guid StrategicPlanId { get; set; }
        
        public virtual StrategicPlan StrategicPlan { get; set; }    
        public TypeStrategicPlanIndicator Type { get; set; }
    }

}
