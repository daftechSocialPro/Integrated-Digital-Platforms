using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.HRM
{
    public class ContractLetterDto
    {
        public string EmployerName { get; set; } = null!;
        public string EmployeerAddress { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public string EmployeeAddress { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string TypeOfEmployement { get; set; } = null!;
        public string SourceOfFund { get; set; } = null!;
        public string PlaceOfWork { get; set; } = null!;
        public DateTime ContractStartDate { get; set; } 
        public DateTime ContractEndDate { get; set; } 
        public string JobTitle { get; set; } = null!;
        public string ReportingTo { get; set; } = null!;
        public double GrossSalary { get; set; }
        public string GrossSalaryInWord { get; set; } = null!;
        public double TransportAllowance { get; set; }
        public string TransportAllowanceInWord { get; set; } = null!;
        public double MobileAllowance { get; set; }
        public string MobileAllowanceInWord { get; set; } = null!;
       
    }
}
