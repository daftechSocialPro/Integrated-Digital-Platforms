using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class IncomeTaxDto
    {
        public string? Id { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public float StartingAmount { get; set; }
        public float EndingAmount { get; set; }
        public float Percent { get; set; }
        public float Deductable { get; set; }
        public float Withholding { get; set; }
        public DateTime EndDate { get; set; }
        //public RowStatus Rowstatus { get; set; }
        public bool IsActive { get; set; }
    }
}
