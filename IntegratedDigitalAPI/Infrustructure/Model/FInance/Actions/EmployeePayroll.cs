using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class EmployeePayroll : WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public DateTime PayStart { get; set; }
        public DateTime PayEnd { get; set; }
        public double BasicSallary { get; set; }
        public double TransportFuelAllowance { get; set; }
        public double CommunicationAllowance { get; set; }
        public double OverTime { get; set; }
        public double GrossSallary { get; set; }
        public double Tax { get; set; }
        public double EmployerPension { get; set; }
        public double EmployeePension { get; set; }
        public double ProvidentFund { get; set; }
        public double Loan { get; set; }
        public double Penality { get; set; }
        public double NetPay { get; set; }
    }
}
