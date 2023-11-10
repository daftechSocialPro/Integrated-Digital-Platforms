using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class BankList : WithIdModel
    {
        public string BankName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string? Address { get; set; }
        public string? AmharicAddress { get; set; }
        public string AccountNumber { get; set; } = null!;
        public int BankDigitNumber { get; set; }
    }
}
