using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class DeviceSettingDto
    {
        public string? Id { get; set; } = null!;
        public string? CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Model { get; set; } = null!;
        public string Ip { get; set; } = null!;
        public int Port { get; set; }
        public int Com { get; set; }
    }


    public class DeviceLitsDto
    {
        public string Id { get; set; } = null!;
        public string Ip { get; set; } = null!;
        public int Port { get; set; }
    }
}
