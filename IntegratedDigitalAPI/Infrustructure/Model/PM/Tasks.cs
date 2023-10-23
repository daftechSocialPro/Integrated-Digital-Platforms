using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Activity = IntegratedInfrustructure.Models.PM.Activity;

namespace IntegratedInfrustructure.Model.PM
{
    public class Tasks : WithIdModel
    {
        public Tasks()
        {
            TaskMemos = new HashSet<TaskMemo>();
            TaskMember = new HashSet<TaskMembers>();
            ActivitiesParents = new HashSet<ActivityParent>();
        }

        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; } = null!;
        public string TaskDescription { get; set; } = null!;
        public DateTime? ShouldStartPeriod { get; set; }
        public DateTime? ActuallStart { get; set; }
        public DateTime? ShouldEnd { get; set; }
        public DateTime? ActualEnd { get; set; }
        public float PlanedBudget { get; set; }
        public float? ActualBudget { get; set; }
        public float? Goal { get; set; }
        public float? Weight { get; set; }
        public float ActualWorked { get; set; }

        [DefaultValue(true)]
        public bool HasActivityParent { get; set; }
        public ICollection<TaskMemo> TaskMemos { get; set; }
        public ICollection<TaskMembers> TaskMember { get; set; }
        public ICollection<ActivityParent> ActivitiesParents { get; set; }
        public ICollection<Activity> Activities { get; set; }

    }


}
