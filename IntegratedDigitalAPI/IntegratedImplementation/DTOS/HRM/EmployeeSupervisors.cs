using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeeSupervisorsDto
    {
        public Guid Id { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string ImmidiateSupervisor { get; set; } = null!;
        public string SecondSupervisor { get; set; } = null!;
    }

    public class AssignSupervisorDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public Guid SupervisorId { get; set; }
        public Guid SecondSuprvisorId { get; set; }
    }
}
