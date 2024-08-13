using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class JournalVoucher: WithIdModel
    {
        public DateTime Date { get; set; }
        public Guid PeriodDetailsId { get; set; }
        public virtual PeriodDetails PeriodDetails { get; set; } = null!;
        public string Description { get; set; } = null!;
        public TypeofJV TypeofJV { get; set; }
       
    }
}
