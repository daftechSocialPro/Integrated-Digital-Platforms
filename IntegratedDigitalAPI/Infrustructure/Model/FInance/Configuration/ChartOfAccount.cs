using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class ChartOfAccount: WithIdModel
    {
        public ChartOfAccount()
        {
            SubsidaryAccounts = new HashSet<SubsidiaryAccount>();
        }
        public Guid AccountTypeId { get; set; }
        public virtual AccountType AccountType { get; set; } = null!;
        public string AccountNo { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool OnlyControlAccount { get; set; }

        [InverseProperty(nameof(SubsidiaryAccount.ChartOfAccount))]
        public ICollection<SubsidiaryAccount> SubsidaryAccounts { get; set; }
    }
}
