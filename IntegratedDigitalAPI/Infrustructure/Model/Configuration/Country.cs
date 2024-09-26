using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class Country :WithIdModel
    {
        public string CountryName { get; set; }= null!; 
        public string CountryCode { get; set; } = null!;
        public string Nationality { get;set; } = null!; 
    }
}
