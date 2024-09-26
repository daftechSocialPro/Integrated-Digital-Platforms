using MembershipInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Configuration
{
    public class EducationalLevel : WithIdModel
    {
        public string EducationalLevelName { get; set; } = null!;

        public string? Remark { get; set; }
    }
}
