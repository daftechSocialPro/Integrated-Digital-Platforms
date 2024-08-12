using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class AddJournalVochureDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = null!;
        public TypeofJV TypeofJV { get; set; }
        public string CreatedById { get; set; } = null!;
        public List<AddJournalVoucherDetailDto> AddJournalVoucherDetailDtos { get; set; } = null!;
    }


    public class AddJournalVoucherDetailDto
    {
        public Guid ChartOfAccountId { get; set; }
        public Guid? SubsidiaryAccountId { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string Remark { get; set; } = null!;
    }
}
