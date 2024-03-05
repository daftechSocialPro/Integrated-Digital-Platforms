using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class ChartOfAccountDto
    {
        public Guid Id { get; set; }
        public string AccountType { get; set; } = null!;
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool OnlyControlAccount { get;set; }
        public bool IsActive { get; set; }
        public List<SubsidiaryAccountDto> SubsidiaryAccounts { get; set; } = null!;
    }

    public class SubsidiaryAccountDto
    {
        public Guid Id { get; set; }
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Sequence { get; set; }
        public bool IsActive { get; set; }
    }

    public class AddChartOfAccountDto
    {
        public Guid AccountTypeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool OnlyControlAccount { get; set; }
    }

    public class UpdateChartOfAccountDto : AddChartOfAccountDto
    {
        [Required]
        public Guid Id { get; set; }
    }


    public class AddSubsidiaryAccount
    {
        public Guid ChartOfAccountId { get; set; }
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Sequence { get; set; }
        public string CreatedById { get; set; } = null!;
    }

    public class UpdateSubsidiaryAccount: AddSubsidiaryAccount
    {
        [Required]
        public Guid Id { get; set; }
    }

}
