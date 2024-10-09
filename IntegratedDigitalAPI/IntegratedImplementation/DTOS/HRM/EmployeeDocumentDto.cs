using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public record EmployeeDocumentsPostDTO
    {

        [Required]
        public Guid EmployeeId { get; set; }
        [Required]
        public Guid DocumentTypeId { get; set; }

        public IFormFile Document { get; set; }

        public string CreatedById { get; set; } = null!;
        public RowStatus Rowstatus { get; set; }
    }

    public record EmployeeDocumentsGetDTO : EmployeeDocumentsPostDTO
    {
        public Guid Id { get; set; }
        public string? DocumentTypeName { get; set; }
        public string? DocumentTypeCategory { get; set; }
        public string FilePath { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
    }

}
