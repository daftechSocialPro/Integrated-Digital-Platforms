using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public record ProjectLocationGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

      
    }

    public record ProjectLocationPostDto
    {

        public string Name { get; set; } 

        public string CreatedById { get; set; }
    }
}
