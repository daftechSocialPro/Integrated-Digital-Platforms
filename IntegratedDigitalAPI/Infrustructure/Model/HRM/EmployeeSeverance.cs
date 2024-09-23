using IntegratedInfrustructure.Model.Authentication;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSeverance : WithIdModel
    {
        public Guid EmploymentDetailId { get; set; }
        public virtual EmploymentDetail EmploymentDetail { get; set; } = null!;
        public double Amount { get; set; }
    }
}
