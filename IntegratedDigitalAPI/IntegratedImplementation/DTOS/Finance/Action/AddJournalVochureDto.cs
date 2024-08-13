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

    public record GetJournalVoucherDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = null!;
        public string TypeofJVName { get; set; }
        public List<GetJournalVoucherDetailDto> GetJournalVoucherDetails { get; set; }
    }

    public record GetJournalVoucherDetailDto
    {
        public string ChartOfAccountDescription { get; set; }
        public string SubsidiaryAccountDescription { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string Remark { get; set; } = null!;
    }
}
