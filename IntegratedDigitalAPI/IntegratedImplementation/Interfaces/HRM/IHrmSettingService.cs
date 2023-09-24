using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IHrmSettingService
    {

        Task<List<HrmSettingDto>> GetHrmSettings();
        Task<ResponseMessage> AddHrmSetting(HrmSettingPostDto HrmSettingPost);
        Task<ResponseMessage> UpdateHrmSetting(HrmSettingDto HrmSettingUpdate);

    }
}
