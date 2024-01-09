using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class MaintainableItems: WithIdModel
    {
        public bool FromStore { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? IssueDetailId { get; set; }
        public DateTime? SentDate { get; set; }
        public DateTime? ReturnedDate { get; set; }
    }
}
