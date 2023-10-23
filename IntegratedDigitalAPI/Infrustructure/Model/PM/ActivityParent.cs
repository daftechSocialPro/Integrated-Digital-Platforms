
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.PM;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.PM
{
    public class ActivityParent : WithIdModel
    {
        public ActivityParent()
        {
            Activities = new HashSet<Activity>();
            TaskMemos = new HashSet<TaskMemo>();
            TaskMember = new HashSet<TaskMembers>();
        }
        public Guid? TaskId { get; set; }
        public virtual Tasks Task { get; set; }
        public string ActivityParentDescription { get; set; } = null!;
        public DateTime? ShouldStartPeriod { get; set; }
        public DateTime? ActuallStart { get; set; }
        public DateTime? ShouldEnd { get; set; }
        public DateTime? ActualEnd { get; set; }
        public float PlanedBudget { get; set; }
        public float? ActualBudget { get; set; }
        public float? Goal { get; set; }
        public float? Weight { get; set; }
        public float ActualWorked { get; set; }
        public Status Status { get; set; }
        public bool HasActivity { get; set; }

     
        public ICollection<Activity> Activities { get; set; }

     
        public ICollection<TaskMemo> TaskMemos { get; set; }

     
        public ICollection<TaskMembers> TaskMember { get; set; }
    }
}
