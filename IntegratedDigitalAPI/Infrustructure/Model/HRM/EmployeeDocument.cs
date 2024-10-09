using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System.ComponentModel.DataAnnotations;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeDocument : WithIdModel
    {

        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; }
        [Required]
        public Guid DocumentTypeId { get; set; }
        public virtual DocumentType DocumentType { get; set; } = null!;
        public string FilePath { get; set; } = null!;


    }
}
