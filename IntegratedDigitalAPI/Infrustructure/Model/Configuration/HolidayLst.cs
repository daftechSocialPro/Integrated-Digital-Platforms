using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class HolidayLst: WithIdModel
    {
        public string Name { get; set; } = null!;
        public DateTime Date { get; set; }
    }
}
