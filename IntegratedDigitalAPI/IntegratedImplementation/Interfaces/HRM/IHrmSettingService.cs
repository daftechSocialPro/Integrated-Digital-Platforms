﻿using Implementation.Helper;
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

        Task<List<BenefitListDto>> GetBenefitLists();
        Task<ResponseMessage> AddBenefitList(AddBenefitListDto addBenefitList);
        Task<ResponseMessage> UpdateBenefitList(UpdateBenefitListDto updateBenefitList);


        Task<List<DeviceSettingDto>> GetDeviceSettingList();
        Task<List<DeviceLitsDto>> GetDeviceList();
        Task<ResponseMessage> AddDeviceSetting(DeviceSettingDto deviceSettingDto);
        Task<ResponseMessage> UpdateDeviceSetting(DeviceSettingDto deviceSettingDto);


        Task<List<PerformanceSettingDto>> GetPerformanceSettings();
        Task<ResponseMessage> AddPerformanceSetting(PerformanceSettingDto performanceSetting);
    }
}
