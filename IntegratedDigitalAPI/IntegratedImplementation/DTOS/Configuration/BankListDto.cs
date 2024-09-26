using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public class BankListDto
    {
        public Guid Id { get; set; }
        public string BankName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string? Address { get; set; }
        public string? AmharicAddress { get; set; }
        public string? Branch { get; set; }
        public string? AmharicBranch { get; set; }
        public string AccountNumber { get; set; } = null!;
        public int BankDigitNumber { get; set; }
    }

    public class AddBankDto
    {
        public string? createdById { get; set; }
        public string BankName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string? Address { get; set; }
        public string? AmharicAddress { get; set; }
        public string? Branch { get; set; }
        public string? AmharicBranch { get; set; }
        public string AccountNumber { get; set; } = null!;
        public int BankDigitNumber { get; set; }
    }

    public class UpdateBankDto : AddBankDto
    {
        public Guid Id { get; set; }
    }
}
