using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class FinanceLookupService : IFinanceLookupService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public FinanceLookupService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public async Task<ResponseMessage> AddFinanceLookup(FinanceLookupPostDto FinanceLookupPost)
        {
            FinanceLookup FinanceLookup = new FinanceLookup
            {
                Id = Guid.NewGuid(),
                Category = Enum.Parse <LOOKUPCATEGORY>(FinanceLookupPost.Category),
                LookupType = Enum.Parse<LOOKOUPTYPE>(FinanceLookupPost.LookupType),
                LookupValue = FinanceLookupPost.LookupValue,
                IsDefault = FinanceLookupPost.IsDefault,
                Description = FinanceLookupPost.Description,
                Remark = FinanceLookupPost.Remark,
                CreatedById = FinanceLookupPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.FinanceLookups.AddAsync(FinanceLookup);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = FinanceLookup,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<FinanceLookupGetDto>> GetFinanceLookups()
        {

            var FinanceLookups = await _dbContext.FinanceLookups.AsNoTracking().ProjectTo<FinanceLookupGetDto>(_mapper.ConfigurationProvider).ToListAsync();
            return FinanceLookups;
        }

        public async Task<ResponseMessage> UpdateFinanceLookup(FinanceLookupGetDto FinanceLookup)
        {

            var currentFinanceLookup = await _dbContext.FinanceLookups.FirstOrDefaultAsync(x => x.Id.Equals(FinanceLookup.Id));


            if (currentFinanceLookup != null)
            {

                currentFinanceLookup.LookupType = Enum.Parse<LOOKOUPTYPE>(FinanceLookup.LookupType);
                currentFinanceLookup.LookupValue = FinanceLookup.LookupValue;
                currentFinanceLookup.IsDefault = FinanceLookup.IsDefault;
                currentFinanceLookup.Remark = FinanceLookup.Remark;
          
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Data = currentFinanceLookup, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }
    }
}
