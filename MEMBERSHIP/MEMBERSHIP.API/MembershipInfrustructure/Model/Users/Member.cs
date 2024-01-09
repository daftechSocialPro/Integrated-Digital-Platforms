using MembershipInfrustructure.Model.Authentication;
using MembershipInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipInfrustructure.Model.Users
{
    public class Member : WithIdModel2
    {

      
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        public string? ImagePath { get; set; }
        public string? Email { get; set; }

        public Guid? ZoneId { get; set; }
        public Zone Zone { get; set; }

        public string? Woreda { get; set; }

        public DateTime BirthDate { get; set; }
        public string? EducationalField { get; set; }

        public Guid? EducationalLevelId { get; set; }
        public EducationalLevel EducationalLevel { get; set; }

        public Guid MembershipTypeId { get; set; }
        public MembershipType MembershipType { get; set; }

        public string? MemberId { get; set; }
        public Gender Gender { get; set; }
        public string Inistitute { get; set; }
        public string? InstituteRole { get; set; }
  


        public bool IsProfileCompleted { get; set; }

        public string? RejectedRemark { get; set; }


        public IDCARDSTATUS IdCardStatus { get; set; }

        public bool IsBirthDate { get; set; }



    }

    public enum IDCARDSTATUS
    {
        
        REQUESTED,
        REJECTED,
        APPROVED
        

    } 
}
