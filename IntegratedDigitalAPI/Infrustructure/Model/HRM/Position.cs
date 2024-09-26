using IntegratedInfrustructure.Model.Authentication;
using System.ComponentModel.DataAnnotations;

namespace IntegratedInfrustructure.Model.HRM
{
    public class Position : WithIdModel
    {
        [Required]
        public string PositionName { get; set; } = null!;

        [Required]
        public string AmharicName { get; set; } = null!;

        public bool HasSeverance { get; set; }
        public double? SeverancePercentage { get; set; }
    }
}
