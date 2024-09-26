using MembershipInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Configuration
{
    public class EducationalField : WithIdModel
    {
        public string EducationalFieldName { get; set; } = null!;
        public string? Remark { get; set; }
    }
}
