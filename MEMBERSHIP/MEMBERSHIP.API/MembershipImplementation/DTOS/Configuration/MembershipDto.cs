using MembershipInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.DTOS.Configuration
{
    public record MembershipTypePostDto
    {

        public string Name { get; set; }

        public string ShortCode { get; set; }

        public int Years { get; set; }

        public double Money { get; set; }

        public string Description { get; set; }

        public string MembershipCategory { get; set; }

        public string CreatedById { get; set; }

    }

    public record MembershipTypeGetDto
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortCode { get; set; }
        public int Years { get; set; }
        public double Money { get; set; }
        public string Description { get; set; }
        public string MembershipCategory { get; set; }

    }
}
