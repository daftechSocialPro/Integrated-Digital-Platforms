using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class AccountType : WithIdModel
    {

        public string Type { get; set; } = null!;
        public NORMALBALANCE Normal_Balance { get; set; }
        public ACCOUNTTYPECATEGORY Category { get; set; }
        public ACCOUNTTYPESUBCATEGORY SubCategory { get; set; }
        public string Remark { get; set; } = null!;
    }

   

   
}
