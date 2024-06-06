using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class ClientsListDto
    {
        public Guid Id { get; set; } 
        public string TypeOfCustomer { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public Guid CountryId { get; set; } 
        public string CountryName { get; set; } = null!;
        public string Address { get; set; } = null!;
    }

    public class AddClientDto
    {
        public TypeOfCustomer TypeOfCustomer { get; set; } 
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string EmailAddress { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public Guid CountryId { get; set; }
        public string Address { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
    }

    public class UpdateClientDto: AddClientDto
    {
        public Guid Id { get; set; }
    }
}
