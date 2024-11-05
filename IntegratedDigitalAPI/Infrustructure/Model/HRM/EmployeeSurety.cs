using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSurety:WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;

        public string PhotoPath { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string SuretyAddress { get; set; } = null!;
        public string LetterPath { get; set; } = null!;
        public string IdCardPath { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string CompnayPhoneNumber { get; set; } = null!;
        

    }
}
