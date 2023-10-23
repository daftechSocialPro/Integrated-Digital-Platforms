using IntegratedInfrustructure.Model.Authentication;

namespace IntegratedInfrustructure.Models.PM
{
    public class QuarterSetting : WithIdModel
    {
        public string QuarterName { get; set; }
        public int QuarterOrder { get; set; }
        public int StartMonth { get; set; }
        public int EndMonth { get; set; }
    }
}
