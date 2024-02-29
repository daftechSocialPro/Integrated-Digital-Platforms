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
        public string Temporary { get; set; } = null!;
        public ACCOUNTTYPECATEGORY Category { get; set; }
        public ACCOUNTTYPESUBCATEGORY SubCategory { get; set; }
        public string Remark { get; set; } = null!;
    }

    public enum ACCOUNTTYPECATEGORY
    {
        OTHER,
        ASSET,
        CAPITAL,
        EQUITY,
        LIABILITY
    }

    public enum ACCOUNTTYPESUBCATEGORY
    {
        ASSET, 
        CAPITAL, 
        COST_OF_SALES, 
        CURRENT_ASSET, 
        CURRENT_LIABILITY, 
        EQUITY, 
        EXPENSES , 
        FIXED_ASSET, 
        INCOME, 
        LIABILITY , 
        LONG_TERM_LIABILITY,
        MEDIUM_TERM_LIABILITY,
        OTHER_ASSET
    }

   
}
