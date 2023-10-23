

using IntegratedInfrustructure.Model.Authentication;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Common
{
    public class UnitOfMeasurment : WithIdModel
    {
        public string Name { get; set; } = null!;

        public string LocalName { get; set; } = null!;
        public MeasurmentType Type { get; set; }

    }

    
}
