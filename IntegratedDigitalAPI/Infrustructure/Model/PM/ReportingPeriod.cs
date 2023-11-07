using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.PM
{
    public class ReportingPeriod : WithIdModel
    {
        public int NumberOfDays {get;set; }
        public ReportingType ReportingType { get; set; }
    }
}
