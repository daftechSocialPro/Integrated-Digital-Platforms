using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{

    public class AccountReconsilationFindDto
    {
        public Guid BankId { get; set; }
        public Guid AccountingPeriodId { get; set; }
    }
    public class CheckAndBalanceDto
    {
        public Guid Id { get; set; }
        public string ReferenceNo { get; set; } = null!;
        public double Ammount { get; set; }
        public DateTime Date { get; set; }
        public string? Payee { get; set; } 
        public string Check { get; set; } = null!;

    }

    public class DepositBankDto
    {
        public Guid Id { get; set; }
        public string ReferenceNo { get; set; } = null!;
        public double Ammount { get; set; }
        public DateTime Date { get; set; } 
        public string Description { get; set; } = null!;
    }


    public class AccountToBeReconsiledDto
    {
        public List<CheckAndBalanceDto> CheckAndBalance { get; set; } = null!;
        public List<DepositBankDto> DepositBank { get; set; } = null!;
    }


    public class AddAccountReconsilationDto
    {
        public Guid BankId { get; set; }
        public Guid PeriodId { get; set; }
        public double Ammount { get; set; }
        public string CreatedById { get; set; } = null!;
    }
}
