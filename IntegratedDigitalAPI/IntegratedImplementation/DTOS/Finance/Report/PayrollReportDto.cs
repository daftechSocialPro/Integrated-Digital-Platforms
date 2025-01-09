using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Report
{
    public class PayrollReportDto
    {
        public string EmployeeName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public int DaysWorked { get; set; }
        public string SourceOfFund { get; set; } = null!;
        public double Salary { get; set; }
        public double TransportFuelAllowance { get; set; }
        public double CommunicationAllowance { get; set; }
        public double PositionAllowanceOT { get; set; }
        public double EmployerPension { get; set; }
        public double EmployeePension { get; set; }
        public double TotalEarning { get; set; }
        public double OverTime { get; set; }
        public double TaxableIncome { get; set; }
        public double IncomeTax { get; set;}
        public double Pension { get; set; }
        public double Loan { get; set; }
        public double TotalDeduction { get; set; }
        public double NetPay { get; set; }

        public string AccountNumber { get; set; } = null!;
        public string EmployeeCode { get; set; } = null!;

    }


    public class PensionReportDto
    {
        public int TotalEmployees { get; set; }
        public double TotalEmployeePension { get; set; }
        public double TotalEmployerPension { get; set; }
        public double TotalPension { get; set;}
        public List<PensionEmployeesDto> PensionEmployees { get; set; } = null!;
        public List<TerminatedEmployeesDto> TerminatedEmployees { get; set; } = null!;
       
        
    }

    public class TerminatedEmployeesDto
    {
        public string EmployeeName { get; set; } = null!;
        public string? TinNumber { get; set; } 

    }

    public class PensionEmployeesDto
    {
        public string? TinNumber { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string EmploymentDate { get; set; } = null!;
        public double Salary { get; set; }
        public double EmployeePension { get; set; }
        public double EmployerPension { get; set; }
        public double Total { get; set; }
    }


    public class IncomeTaxReportDto
    {
        public int TotalNoEmployee { get; set; }
        public double TotalIncome { get; set; }
        public double TotalTax { get; set; }
        public string Month { get; set; } = null!;
        public int Year { get; set; }
        public List<IncomeTaxEmployeeDto> IncomeTaxEmployeeDto { get; set; } = null!;
       public List<TerminatedEmployeesDto> TerminatedEmployees { get; set; } = null!;
    }

    public class IncomeTaxEmployeeDto
    {
        public string EmployeeName { get; set; } = null!;
        public string? TinNumber { get; set; }
        public string HireDate { get; set; } = null!;
        public double BasicSalary { get; set; } 
        public double TransportAllowance { get; set; }
        public double Allowance { get; set; }
        public double OverTime { get; set; }
        public double OtherAllowance { get; set; }
        public double TotalIncome { get; set; }
        public double IncomeTax { get; set; }
        public double CostSharing { get; set; }
        public double NetIncome { get; set; }
    }
}
