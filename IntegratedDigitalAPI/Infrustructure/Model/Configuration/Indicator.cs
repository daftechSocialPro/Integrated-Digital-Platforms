

using IntegratedInfrustructure.Model.Authentication;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Common
{
    public class Indicator : WithIdModel
    {
        public string Name { get; set; } = null!;
        public string LocalName { get; set; } = null!;
        public TypeOfIndicator Type { get; set; }
    }

}
