using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class DeviceSetting : WithIdModel
    {

        public string Name { get; set; } = null!;
        public string Model { get; set; } = null!;
        public string Ip { get; set; } = null!;
        public int Port { get; set; }
        public int Com { get; set;}
    }
}
