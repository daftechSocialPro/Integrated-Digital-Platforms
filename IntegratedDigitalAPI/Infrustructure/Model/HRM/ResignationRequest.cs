using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class ResignationRequest: WithIdModel
    {
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string ReasonForResignation { get; set; } = null!;
        public DateTime ResignationDate { get; set; }
        public string ResignationLetterPath { get; set; } = null!;
        public bool IsApproved { get; set; }
        public virtual EmployeeList Approver { get; set; } = null!;
        public Guid? ApproverId { get; set; }
        public DateTime? ApprovedDate { get; set;}
        public bool IsTerminated { get; set; }

    }
}
