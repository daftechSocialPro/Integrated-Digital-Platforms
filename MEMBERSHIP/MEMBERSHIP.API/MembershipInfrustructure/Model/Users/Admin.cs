using MembershipInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Users
{
    public class Admin :WithIdModel
    {

        public string FullName { get; set; }

        public string Email { get;set; }

        public string ImagePath { get; set; }   
    }
}
