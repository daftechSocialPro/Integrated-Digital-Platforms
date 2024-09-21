using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IHrmSettingService
    {

        Task<List<HrmSettingDto>> GetHrmSettings();
        Task<ResponseMessage> AddHrmSetting(HrmSettingPostDto HrmSettingPost);
        Task<ResponseMessage> UpdateHrmSetting(HrmSettingDto HrmSettingUpdate);

        Task<List<BenefitListDto>> GetBenefitLists();
        Task<ResponseMessage> AddBenefitList(AddBenefitListDto addBenefitList);
        Task<ResponseMessage> UpdateBenefitList(UpdateBenefitListDto updateBenefitList);


        Task<List<DeviceSettingDto>> GetDeviceSettingList();
        Task<List<DeviceLitsDto>> GetDeviceList();
        Task<ResponseMessage> AddDeviceSetting(DeviceSettingDto deviceSettingDto);
        Task<ResponseMessage> UpdateDeviceSetting(DeviceSettingDto deviceSettingDto);


        Task<List<PerformanceSettingDto>> GetPerformanceSettings();
        Task<ResponseMessage> AddPerformanceSetting(PerformanceSettingDto performanceSetting);


        //Task<ResponseMessage> AddSeveranceSetting(SeveranceSettingDto severanceSetteingDto);
        //Task<ResponseMessage> UpdateSeveranceSetting(SeveranceSettingDto severanceSettingDto);
        //Task<List<SeveranceSettingDto>> GetAllSeveranceSetting();
    }
}
