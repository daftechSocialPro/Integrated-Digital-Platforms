using MembershipInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Configuration
{
    public class Announcment:WithIdModel
    {
        public string? ImagePath { get; set; }
        public string Title { get; set; }
        public string Description { get; set;}
        public DateTime EpiredDate { get; set; }


    }
}
