using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class Position :WithIdModel
    {

        public string PositionName { get; set; } = null!;

        public string JobTitle { get;set; } = null!;
    }
}
