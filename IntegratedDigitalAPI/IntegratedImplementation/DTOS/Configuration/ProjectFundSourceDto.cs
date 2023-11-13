using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public record ProjectFundSourceGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

      
    }

    public record ProjectFundSourcePostDto
    {

        public string Name { get; set; } 

        public string CreatedById { get; set; }
    }
}
