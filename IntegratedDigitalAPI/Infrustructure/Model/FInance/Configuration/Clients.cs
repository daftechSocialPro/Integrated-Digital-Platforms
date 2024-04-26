using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class Clients: WithIdModel
    {
        public string Name { get; set; } = null!;
    }
}
