using IntegratedInfrustructure.Model.Authentication;
using System.ComponentModel.DataAnnotations;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class DocumentType : WithIdModel
    {
        public string FileName { get; set; } = null!;
        [Required]
        public FileExtentions FileExtentions { get; set; }
        [Required]
        public DocumentCategory DocumentCategory { get; set; }

        public bool IsRequired { get; set; }
    }
}
