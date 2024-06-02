using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class Clients: WithIdModel
    {
        public TypeOfCustomer TypeOfCustomer { get; set; }
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;
        public string Address { get; set; } = null!;


    }
}
