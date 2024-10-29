using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class PerformancePlan: WithIdModel
    {
        public int Index { get; set; }
        public string Description { get; set; } = null!;
        public TypeOfPerformance TypeOfPerformance { get; set; }
        public Guid PositionId { get; set; }
        public virtual Position Position { get; set; } = null!;
    }
}
