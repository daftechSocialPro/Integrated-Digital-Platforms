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

        public Guid? Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AmharicFirstName { get; set; } = null!;
        public string AmharicMiddleName { get; set; } = null!;
        public string AmharicLastName { get; set; } = null!;
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
        public DateTime? TerminatedDate { get; set; }
        public bool IsPension { get; set; }
        public string? PensionCode { get; set; } = null!;
        public string? TinNumber { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public DateTime? ContractEndDate { get; set; }
     
        public string CreatedById { get; set; } = null!;
        public bool ExistingEmployee { get; set; }
        public Guid BankId { get; set; }
    }

    public class EmployeeListDto
    {
        public Guid Id { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string? ImagePath { get; set; }
        public string EmploymentType { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string MartialStatus { get; set; } = null!;
        public DateTime EmploymentDate { get; set; }
        public string EmploymentStatus { get; set; } = null!;

    }


    public class EmployeeGetDto
    {
        public Guid Id { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AmharicFirstName { get; set; } = null!;
        public string AmharicMiddleName { get; set; } = null!;
        public string AmharicLastName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public string DepartmentName { get; set; } = null!;
        public string PostionName { get; set; } = null!;
        public string Nationality { get; set; } = null!;
        public string NationalityId { get; set; } = null!;
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
        public bool ExistingEmployee { get; set; }
        public bool IsApproved { get; set; }
        public Guid BankId { get; set; }
    }

    public record EmployeeUpdateDto
    {

        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;

        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public IFormFile? ImagePath { get; set; }
        public Guid? ZoneId { get; set; }

        public string? Woreda { get; set; }
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

        public string SourceOfSalary { get; set; } = null!;

        public Guid EmployeeId { get; set; }

        public string Remark { get; set; } = null!;
        public string RowStatus { get; set; } = null!;
        public List<EmployeeSalaryGetDto> EmployeeSalaries { get; set; } = null!;

    }

    public record EmployeeSalryPostDto
    {
        public Guid EmployeeDetailId { get; set; }
        public string ProjectName { get; set; }=null!;
        public double Amount { get; set; }
        public string CreatedById { get; set; } = null!;

    }

    public record EmployeeSalaryGetDto
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; }
        public double Amount { get; set; }


    }
    public record EmployeeHistoryPostDto
    {
        public Guid Id { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public double Salary { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SourceOfSalary { get; set; }
        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public string Remark { get; set; }

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

    public record EmployeeFilePostDto
    {
        public Guid EmployeeId { get; set; }
        public string FileName { get; set; } = null!;
        public IFormFile FilePath { get; set; }=null!;
        public string CreatedById { get; set; } = null!;

    }

    public record EmployeeFileGetDto
    {

        public Guid Id { get; set; }
        public string FileName { get; set; } = null!;
        public IFormFile? File { get; set; } = null!;
        public string? FilePath { get; set; } = null!;
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

        public Guid? EducationalLevelId { get; set; }

        public Guid? EducationalFieldId { get; set; }
        public string EducationalField { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public DateTime FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public string? Remark { get; set; }
    }







}
