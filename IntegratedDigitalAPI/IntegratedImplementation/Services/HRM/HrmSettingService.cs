using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class HrmSettingService:IHrmSettingService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public HrmSettingService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<HrmSettingDto>> GetHrmSettings()
        {
            var hrmSettingsList = await _dbContext.HrmSettings.AsNoTracking()
                                  .ProjectTo<HrmSettingDto>(_mapper.ConfigurationProvider)
                                  .ToListAsync();
            return hrmSettingsList;
        }

        public async Task<ResponseMessage> AddHrmSetting(HrmSettingPostDto HrmSettingPost)
        {


            HrmSetting HrmSetting = new HrmSetting
            {
                Id = Guid.NewGuid(),
                GeneralSetting =Enum.Parse<GeneralHrmSetting>(HrmSettingPost.GeneralSetting),
                Value = HrmSettingPost.value,
                CreatedById = HrmSettingPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.HrmSettings.AddAsync(HrmSetting);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = HrmSetting,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> UpdateHrmSetting(HrmSettingDto HrmSetting)
        {
            var currentHrmSetting = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.Id.Equals(HrmSetting.Id));

            if (currentHrmSetting != null)
            {
                
                currentHrmSetting.Value = HrmSetting.value;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentHrmSetting, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find HrmSetting" };
        }

        public async Task<List<PerformanceSettingDto>> GetPerformanceSettings()
        {
            return await _dbContext.PerformanceSettings.Select(x =>
                            new PerformanceSettingDto
                            {
                                PerformanceMonth = x.PerformanceMonth,
                                PerformanceIndex = x.PerformanceIndex,
                                PerformanceEndDate = x.PerformanceEndDate,
                                PerformanceStartDate = x.PerformanceStartDate,
                            }).ToListAsync();
        }

        public async Task<ResponseMessage> AddPerformanceSetting(PerformanceSettingDto performanceSetting)
        {
          
            PerformanceSetting performance = new PerformanceSetting
            {
                Id = Guid.NewGuid(),
                CreatedById = performanceSetting.CreatedById,
                CreatedDate = DateTime.Now,
                PerformanceIndex = performanceSetting.PerformanceIndex,
                PerformanceMonth = performanceSetting.PerformanceMonth,
                PerformanceStartDate = performanceSetting.PerformanceStartDate,
                PerformanceEndDate = performanceSetting.PerformanceEndDate,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.PerformanceSettings.AddAsync(performance);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added SuccessFully" };
        }

        public async Task<List<BenefitListDto>> GetBenefitLists()
        {
            return await _dbContext.BenefitLists.Select(x =>
                          new BenefitListDto
                          {
                                Id = x.Id,
                                Name = x.Name,
                                AmharicName = x.AmharicName,
                                TaxableAmount = x.TaxableAmount,
                                AddOnContract = x.AddOnContract
                          }).ToListAsync();
        }

        public async Task<ResponseMessage> AddBenefitList(AddBenefitListDto addBenefitList)
        {
            var nameExists = await _dbContext.BenefitLists.AnyAsync(x => x.Name == addBenefitList.Name);
            if (nameExists)
                return new ResponseMessage { Success = false, Message = "Name already exists" };

            BenefitList newBenefit = new BenefitList
            {
                Id = Guid.NewGuid(),
                CreatedById = addBenefitList.CreatedById,
                CreatedDate = DateTime.Now,
                Rowstatus = RowStatus.ACTIVE,
                Name = addBenefitList.Name,
                AmharicName = addBenefitList.AmharicName,
                TaxableAmount = addBenefitList.TaxableAmount,
                AddOnContract = addBenefitList.AddOnContract
            };

            await _dbContext.BenefitLists.AddAsync(newBenefit);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Successfully Added Benefit", Data = newBenefit };
        }

        public async Task<ResponseMessage> UpdateBenefitList(UpdateBenefitListDto updateBenefitList)
        {
            var currentBenefit = await _dbContext.BenefitLists.FirstOrDefaultAsync(x => x.Id == updateBenefitList.Id);
            if (currentBenefit == null)
                return new ResponseMessage { Success = false, Message = "Could not find benefit" };

            var nameExists = await _dbContext.BenefitLists.AnyAsync(x => x.Id != currentBenefit.Id && updateBenefitList.Name == x.Name);
            if (nameExists)
                return new ResponseMessage { Success = false, Message = "Name already Exists" };

            currentBenefit.Name = updateBenefitList.Name;
            currentBenefit.AmharicName = updateBenefitList.AmharicName;
            currentBenefit.TaxableAmount = updateBenefitList.TaxableAmount;
            currentBenefit.AddOnContract = updateBenefitList.AddOnContract;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }

        public async Task<ResponseMessage> AddDeviceSetting(DeviceSettingDto deviceSettingDto)
        {
            DeviceSetting deviceSetting = new DeviceSetting
            {
                Id = Guid.NewGuid(),
                CreatedById = deviceSettingDto.CreatedById,
                Com = deviceSettingDto.Com,
                Ip = deviceSettingDto.Ip,
                Model = deviceSettingDto.Model,
                Name = deviceSettingDto.Name,
                Port = deviceSettingDto.Port,
                CreatedDate = DateTime.Now,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.DeviceSettings.AddAsync(deviceSetting);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = deviceSetting,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<DeviceSettingDto>> GetDeviceSettingList()
        {
            var deviceSettings = await _dbContext.DeviceSettings.AsNoTracking().Select(y => new DeviceSettingDto
            {
                Id = y.Id.ToString(),
                Com = y.Com,
                Ip = y.Ip,
                Model = y.Model,
                Name = y.Name,
                Port = y.Port,
            }).ToListAsync();
            return deviceSettings;
        }

        public async Task<List<DeviceLitsDto>> GetDeviceList()
        {
            var deviceSettings = await _dbContext.DeviceSettings.AsNoTracking().Select(y => new DeviceLitsDto
            {
                Id = y.Id.ToString(),
                Ip = y.Ip,
                Port = y.Port,
            }).ToListAsync();
            return deviceSettings;
        }

        public async Task<ResponseMessage> UpdateDeviceSetting(DeviceSettingDto deviceSettingDto)
        {
            var currentDevice = await _dbContext.DeviceSettings.FirstOrDefaultAsync(x => x.Id.Equals(deviceSettingDto.Id));
            if (currentDevice != null)
            {
                currentDevice.Ip = deviceSettingDto.Ip;
                currentDevice.Model = deviceSettingDto.Model;
                currentDevice.Name = deviceSettingDto.Name;
                currentDevice.Port = deviceSettingDto.Port;
                currentDevice.Com = deviceSettingDto.Com;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentDevice, Success = true, Message = "Device Setting Updated Successfully" };
            }

            return new ResponseMessage { Success = false, Message = "Device Setting Could Not be Found" };
        }



    }
}
