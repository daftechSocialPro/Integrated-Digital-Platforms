using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public record  LeaveTypePostDto
    {
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string LeaveCategory { get; set; } = null!;

        public int MinDate { get; set; }

        public int? MaxDate { get; set; }

        public int? IncrementValue { get; set; }

        public string CreatedById { get; set; } = null!;
    }
    public record LeaveTypeGetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string LeaveCategory { get; set; } = null!;

        public int MinDate { get; set; }

        public int? MaxDate { get; set; }

        public int? IncrementValue { get; set; }
        public List<LeaveDetailListDto> LeaveDetailLists { get; set; } = null!;
    }


    public class LeaveDetailListDto
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string LeaveType { get; set; } = null!;
    }


    public class AddLeaveDetailDto
    {
        public string? CreatedById { get; set; } = null!;
        public Guid LeaveTypeId { get; set; }
        public int Order { get; set; }
        public Guid TakeFromLeaveTypeId { get; set; }
    }

    public class UpdateLeaveDetailDto: AddLeaveDetailDto
    {
        public Guid Id { get; set; }
    }
}
