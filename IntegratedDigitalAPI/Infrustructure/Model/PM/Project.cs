using IntegratedInfrustructure.Migrations;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Activity = IntegratedInfrustructure.Models.PM.Activity;

namespace IntegratedInfrustructure.Model.PM
{
    public class Project:WithIdModel
    {

        public Project()
        {
            Tasks = new HashSet<Tasks>();
            TaskMemos = new HashSet<TaskMemo>();
            TaskMember = new HashSet<TaskMembers>();
            Activities = new HashSet<Activity>();
            ProjectFunds = new HashSet<Project_Fund>();
        }

        public string ProjectName { get; set; } = null!;
        
        public string ProjectNumber { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;
        public int PeriodStartAt { get; set; }
        public int PeriodEndAt { get; set; }
        public Guid ProjectManagerId { get; set; }
        public virtual EmployeeList ProjectManager { get; set; } = null!;
  
      
        [DefaultValue(true)]
        public bool HasTask { get; set; }        
        public float PlannedBudget { get; set; }

        public string Goal { get; set; }

        public string Objective { get; set; }

        public ICollection<Tasks> Tasks { get; set; }

        public ICollection <Project_Fund> ProjectFunds { get; set; }
        public ICollection<TaskMemo> TaskMemos { get; set; }

        public ICollection<TaskMembers> TaskMember { get; set; }

        public ICollection<Activity> Activities { get; set; }


    }
}
