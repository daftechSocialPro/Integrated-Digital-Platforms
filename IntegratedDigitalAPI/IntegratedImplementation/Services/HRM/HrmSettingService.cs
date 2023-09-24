using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
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

    }
}
