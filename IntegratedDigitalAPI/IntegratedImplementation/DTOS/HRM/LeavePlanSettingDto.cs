using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class LeavePlanSettingGetDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string Department { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FromDate { get; set; }
        public string LeavePlanSettingStatus { get; set; }
        public string? Rejectedremark { get; set; }

    }

    public class LeavePlanSettingPostDto
    {
        public Guid Id { get; set; }      
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public string? LeavePlanSettingStatus { get; set; }
        public string? Rejectedremark { get; set; }
        public string CreatedById { get; set; }
        public Guid EmployeeId { get; set; }


    }
    public class LeavePlanSettingUpdateDto
    {
        public Guid Id { get; set; }
        public string LeavePlanSettingStatus { get; set; }

         public string? Rejectedremark { get;set; }
    }
 
}
