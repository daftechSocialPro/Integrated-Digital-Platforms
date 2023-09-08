using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public record EmployeePostDto
    {

        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Gender { get; set; } = null!;

        public string Email { get; set; } = null!;
        public Guid ZoneId { get; set; }

        public string Woreda { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string MaritalStatus { get; set; } = null!;
        public IFormFile? ImagePath { get; set; } = null!;
        public string EmploymentType { get; set; } = null!;
        public string PaymentType { get; set; } = null!;
        public DateTime EmploymentDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
        public bool IsPension { get; set; }
        public string EmploymentStatus { get; set; } = null!;
        public string? PensionCode { get; set; } = null!;
        public string? TinNumber { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public int ContractDays { get; set; } = 0;
        public string CreatedById { get; set; } = null!;


    }

    public class EmployeeGetDto
    {
        public Guid Id { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string MiddleName { get;set; } = null!;
        public string LastName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string DepartmentName { get; set; } = null!;

      
        public string PostionName { get; set; } = null!;


        public string Nationality { get; set; } = null!;

        public Guid CountryId { get; set; }
        public string RegionName { get; set; } = null!;

        public Guid RegionId { get; set; }

        public string ZoneName { get; set; } = null!;
        public Guid ZoneId { get; set; }
        public string Woreda { get; set; } = null!;

        public string Gender { get; set; } = null!;
        public string BirthDate { get; set; } = null!;
        public string MaritalStatus { get; set; } = null!;
        public string? ImagePath { get; set; } = null!;
        public string EmploymentType { get; set; } = null!;
        public string PaymentType { get; set; } = null!;
        public DateTime EmploymentDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
        public bool IsPension { get; set; }
        public string EmploymentStatus { get; set; } = null!;
        public string? PensionCode { get; set; } = null!;
        public string? TinNumber { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;


    }

    public record EmployeeHistoryDto
    {
        public Guid Id { get; set; }
        public string DepartmentName { get; set; } = null!;

        public Guid DepartmentId { get; set; }
        public string PositionName { get; set; } = null!;

        public Guid PositionId { get; set; }
        public double Salary { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Guid EmployeeId { get; set; }


    }

    public record EmployeeHistoryPostDto
    {
        public Guid Id { get; set; }

        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public double Salary { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;


    }

    public record EmployeeFamilyPostDto
    {


        public Guid EmployeeId { get; set; }
        public string FullName { get; set; } = null!;
        public string Gender { get; set; }
        public string FamilyRelation { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Remark { get; set; }
        public string CreatedById { get; set; } = null!;

    }

    public record EmployeeFamilyGetDto
    {

        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public string FullName { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string FamilyRelation { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string? Remark { get; set; }
       

    }


    public record EmployeeEducationPostDto
    {

        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
     
        public Guid EducationalLevelId { get; set; }
       
        public Guid EducationalFieldId { get; set; }
        public string Institution { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public string? Remark { get; set; }

        public string CreatedById { get; set; } = null!;
    }

    public record EmployeeEducationGetDto
    {

        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }

        public string EducationalLevel { get; set; } = null!;
        public string EducationalField { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public string? Remark { get; set; }
    }







}
