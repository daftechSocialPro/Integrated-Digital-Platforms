using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class VacancyList : WithIdModel
    {

        public VacancyList()
        {
            VaccancyDocuments = new HashSet<VacancyDocuments>();
        }
        public string VacancyName { get; set; } = null!;

        public virtual Position Position { get; set; } = null!;
        public Guid PositionId { get; set; }

        public virtual Department Department { get; set; } = null!;
        public Guid DepartmentId { get; set; }

        public string VaccancyDescription { get; set; } = null!;

        public virtual EducationalLevel EducationalLevel { get; set; } = null!;
        public Guid EducationalLevelId { get; set; }

        public virtual EducationalField EducationalField { get; set; } = null!;
        public Guid EducationalFieldId { get; set; }

        public int Quantity { get; set; }
        public EmploymentType EmploymentType { get; set; }

        public DateTime VaccancyStartDate { get; set; }
        public DateTime VaccancyEndDate { get; set; }
        public bool IsApproved { get; set; }

        public double? GPA { get; set; }


        public VacancyType VacancyType { get; set; }

        [InverseProperty(nameof(VacancyDocuments.Vacancy))]
        public ICollection<VacancyDocuments> VaccancyDocuments { get; set; }

    }



}
