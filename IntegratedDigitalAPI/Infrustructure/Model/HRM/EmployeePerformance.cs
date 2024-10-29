using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeePerformance : WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid PerformanceSettingId { get; set; }
        public virtual PerformanceSetting PerformanceSetting { get; set; } = null!;
        public int MonthIndex { get; set; }
        public double SelfRating { get; set; }
        public double SupervisorRating { get; set; }
        public TypeOfPerformance TypeOfPerformance { get; set; }    
        public string? Justification { get; set; }
        public string? SelfStrengthComment { get; set; }
        public string? SelfNeedImporvementComment { get; set; }
        public string? SelfSuddgestionImporvementComment { get; set; }
        public string? SupervisorStrengthComment { get; set; }
        public string? SupervisorNeedImporvementComment { get; set; }
        public string? SupervisorSuddgestionImporvementComment { get; set; }

        public string? SelfGeneralComments { get; set; }
        public string? SupervisorGeneralComments { get; set; }
        public DateTime? DiscussionDate { get; set; }
        public string? SecondSupervisorComments { get; set; }
        public Guid? SupervisorId { get; set; }
        public virtual EmployeeList Supervisor { get; set; } = null!;
        public Guid? SecondSuperviosrId { get; set; }
        public virtual EmployeeList SecondSupervisor { get; set; } = null!;
    }
}
