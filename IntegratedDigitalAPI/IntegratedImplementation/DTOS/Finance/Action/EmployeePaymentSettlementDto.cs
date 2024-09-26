using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class ActivityForSettlementDto
    {
        public Guid? ActivityId { get; set; }
        public string ActivityNumber { get; set; } = null!;
        public string ActivityDescription { get; set; } = null!;
        public double TotalAmount { get; set; }
        public double UsedAmmount { get; set; }
        public List<RequsitionSettlementsDto> RequsitionSettlementsDtos { get; set; } = null!;
    }

    public class RequsitionSettlementsDto
    {
        public Guid RequsitionId { get; set; }
        public string? Employee { get; set; } = null!;
        public double RequestedAmmount { get; set; }
        public double UsedAmmount { get; set; }
        public bool IsExpired { get; set; }
       
    }
}
