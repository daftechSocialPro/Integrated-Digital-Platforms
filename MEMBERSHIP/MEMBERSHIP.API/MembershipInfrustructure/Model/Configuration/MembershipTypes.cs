using MembershipInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipInfrustructure.Model.Configuration
{
    public class MembershipType: WithIdModel
    {
        public string Name { get; set; }

        public string ShortCode { get; set; }

        public int Years { get;set; }

        public double Money { get; set; }

        public Currency Currency { get; set; }


        public string Description { get; set; }

        public MembershipCategory MembershipCategory { get; set; }

        



    }


    public enum MembershipCategory
    {
        MIDWIVES,
        NONMIDWIVES
    } 

    public enum Currency
    {
        ETB,
        USD
    }
}
