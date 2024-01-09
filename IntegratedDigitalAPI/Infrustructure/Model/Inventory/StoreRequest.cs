using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class StoreRequest: WithIdModel
    {
        public StoreRequest()
        {
            StoreRequestLists = new HashSet<StoreRequestList>();
        }
        public string StoreRequestNumber { get; set; } = null!;
        public Guid RequesterEmployeeId { get;set; }
        public virtual EmployeeList RequesterEmployee { get; set; } = null!;

        [InverseProperty(nameof(StoreRequestList.StoreRequest))]
        public ICollection<StoreRequestList> StoreRequestLists { get; set; }



    }
}
