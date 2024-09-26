using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class StoreRequestList: WithIdModel
    {
        public string RequestNumber { get; set; } = null!;
        public Guid? ApproverEmployeeId { get; set; }
        public virtual EmployeeList ApproverEmployee { get; set; } = null!; 
        public Guid ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public double Quantity { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; }
        public bool IsFinalApproved { get; set; }
        public Guid? FinalApproverId { get; set; }
        public virtual EmployeeList FinalApprover { get; set; } = null!;
        public bool IsIssued { get; set; }
        public Guid MeasurementUnitId { get; set; }
        public virtual MeasurmentUnit MeasurementUnit { get; set; } = null!;
        public Guid StoreRequestId { get; set; }
        public virtual StoreRequest StoreRequest { get; set; } = null!;
       

    }
}
