using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Configuration;

public record DocumentTypePostDTO
{
    public string FileName { get; set; } = null!;
    [Required]
    public FileExtentions FileExtentions { get; set; }
    [Required]
    public DocumentCategory DocumentCategory { get; set; }
    public string CreatedById { get; set; } = null!;

    [DefaultValue(true)]
    public RowStatus Rowstatus { get; set; }

}

public record DocumentTypeGetDTO : DocumentTypePostDTO
{
    public Guid Id { get; set; }
    public string? FileExtentionsName { get; set; }
    public string? DocumentCategoryName { get; set; }

}
