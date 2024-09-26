using MembershipInfrustructure.Model.Authentication;
using MembershipInfrustructure.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Configuration
{
    public class Course : WithIdModel
    {
        public string FileName { get; set; }

        public string Description { get; set; }

        public string FilePath { get; set; }

        public Guid MembershipTypeId { get; set; }
        public MembershipType MembershipType { get; set; }

        public bool IsVissible { get; set; }
        public virtual Member Member { get; set; }
        public Guid MemberId { get;set; }


    }
}
