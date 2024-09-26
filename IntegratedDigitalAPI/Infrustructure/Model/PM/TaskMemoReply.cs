


using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;

namespace IntegratedInfrustructure.Models.PM
{
    public class TaskMemoReply : WithIdModel
    {
        public Guid TaskMemoId { get; set; }
        public virtual TaskMemo TaskMemo { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
