﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.DTOS.Configuration
{
    public record MembersPostDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public Guid? ZoneId { get; set; }

        public string? Woreda { get; set; }

        public string Inistitute { get; set; }

        public Guid MembershipTypeId { get; set; }
        

    }

    public record  MemberUpdateDto
    {

        public Guid Id { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string EducationalField { get; set; }
        public Guid EducationalLevelId { get; set; }
        public string Gender { get; set; }

        public IFormFile? Image { get; set; }
        public string Institute { get; set; }

        public string? Email { get; set; }

        public string? Woreda { get; set; }

        public string InstituteRole { get; set; }
    }


    


    public record MembersGetDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string ImagePath { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Region { get; set; }
        public string Zone { get; set; }
        public string Woreda { get; set; }
        public string Inistitute { get; set; }
        public bool IsBirthDate { get; set; }


        public string MembershipTypeId { get; set; }
        public string EducationalField { get; set; }
        public string EducationalLevel { get; set; }


        public string EducationalLevelId { get; set; }
        public string MembershipType { get; set; }
        public string MemberId { get; set; }
        public string Gender { get; set; }
        public string InstituteRole { get; set; }

        public double Amount { get; set; }

        public string Text_Rn { get; set; }

        public DateTime ExpiredDate { get; set; }

        public string PaymentStatus { get; set;  }

        public string IdCardStatus { get; set; }

        public string RejectedRemark { get; set; }

        public bool IsProfileCompleted { get; set; }


        public string? MoodleName { get; set; }

        public string? MoodlePassword { get; set;}

        public string? MoodleId { get;set; }

        public string? MoodleStatus { get; set; }

    }


    public class MemberTelegramDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }       
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string MemberId { get; set; }
        public double Amount { get; set; }
        public string Text_Rn { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string PaymentStatus { get; set; }

        public string Url { get; set; }
        public string MembershipType { get; set; }

        public string MembershipTypeId { get; set; }

    }
    public class CompleteProfileDto
    {
        public Guid Id { get; set; }
        public string EducationalField { get; set; }
        public string EducationalLevelId { get; set; }
        public string Gender { get; set; }
        public string InstituteRole { get; set; }

        public DateTime BirthDate { get; set; }

        public IFormFile Image { get; set; }
    }
}
