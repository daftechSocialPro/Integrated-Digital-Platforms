using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class ResignationRequestDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string ReasonForResignation { get; set; } = null!;
        public DateTime ResignationDate { get; set; }
        public IFormFile? ResignationLetterPath { get; set; }
    }

    public class ResignationRequestListDto
    {
        public Guid Id { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string ReasonForResignation { get; set; } = null!;
    }

}
