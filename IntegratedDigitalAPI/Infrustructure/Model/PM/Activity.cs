using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations.Schema;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Common;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.Training;

namespace IntegratedInfrustructure.Models.PM
{
    public class Activity : WithIdModel
    {

        public Activity()
        {
            ActProgress = new HashSet<ActivityProgress>();
            AssignedEmploye = new HashSet<EmployeesAssignedForActivities>();
    
        }

        public string ActivityDescription { get; set; } = null!;

        public string ActivityNumber { get; set; } = null!;

        public DateTime ShouldStat { get; set; }

        public DateTime ShouldEnd { get; set; }

        public float PlanedBudget { get; set; }

        public DateTime? ActualStart { get; set; }

        public DateTime? ActualEnd { get; set; }

        public float? ActualBudget { get; set; }

        public Status Status { get; set; }

        public Guid? ProjectTeamId { get; set; }
        public virtual ProjectTeam Commitee { get; set; } = null!;
      

        public string Indicator { get; set; }

        public bool IsPercentage { get; set; }

        public float Weight { get; set; }

        public float Goal { get; set; }

        public float Begining { get; set; }
        public float ActualWorked { get; set; }
        public ActivityType ActivityType { get; set; }

        [DefaultValue(0.0)]
        public float OfficeWork { get; set; }

        [DefaultValue(0.0)]
        public float FieldWork { get; set; }
        public TargetDivision? targetDivision { get; set; }
        [DefaultValue(false)]
        public Boolean PostToCase { get; set; }
        public Guid? EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid? PlanId { get; set; }
        public virtual Project Plan { get; set; } = null!;
        public Guid? TaskId { get; set; }
        public virtual Tasks Task { get; set; } = null!;
        public Guid? ActivityParentId { get; set; }
        public virtual ActivityParent ActivityParent { get; set; } = null!;

        public Guid StrategicPlanId { get; set; }
        public virtual StrategicPlan StrategicPlan { get; set; }


        public Guid RegionId { get; set; }
        public virtual Region Region { get; set; }

       
        public string Zone { get; set; } = null;
       

        public string Woreda { get; set; } = null!;

        public Guid StrategicPlanIndicatorId { get; set; }
        public virtual Indicator StrategicPlanIndicator { get; set; }
        //public Guid ProjectLocationId { get; set; }
        //public virtual ProjectLocation ProjectLocation { get; set; }

        public double Latitude { get; set; }
        public double Longtude { get; set; }

        public  bool IsTraining {get;set;}


        public ICollection<ActivityProgress> ActProgress { get; set; }

        public ICollection<EmployeesAssignedForActivities> AssignedEmploye { get; set; }
        public ICollection<ActivityTargetDivision> ActivityTargetDivisions { get; set; }



        public Guid ProjectSourceFundId { get; set; }
        public virtual ProjectFundSource ProjectSourceFund { get; set; }

    }

 
}
