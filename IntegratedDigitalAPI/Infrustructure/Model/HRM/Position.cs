using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class Position :WithIdModel
    {
        [Required]
        public string PositionName { get; set; } = null!;

        [Required]
        public string AmharicName { get; set; } = null!;
    }
}
