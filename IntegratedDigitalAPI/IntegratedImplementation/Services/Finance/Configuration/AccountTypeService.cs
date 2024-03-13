using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class AccountTypeService : IAccountTypeService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public AccountTypeService(ApplicationDbContext dbContext, IMapper mapper )
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public async Task<ResponseMessage> AddAccountType(AccountTypePostDto accountTypePost)
        {

            AccountType accountType = new AccountType
            {
                Id = Guid.NewGuid(),
                Type = accountTypePost.Type,
                Category = Enum.Parse<ACCOUNTTYPECATEGORY>(accountTypePost.Category),
                SubCategory = Enum.Parse<ACCOUNTTYPESUBCATEGORY>(accountTypePost.SubCategory),
                Normal_Balance = Enum.Parse<NORMALBALANCE>(accountTypePost.Normal_Balance),
                Remark = accountTypePost.Remark,
                CreatedById = accountTypePost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.AccountTypes.AddAsync(accountType);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = accountType,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<AccountTypeGetDto>> GetAccountTypes()
        {

            var accountTypes = await _dbContext.AccountTypes.AsNoTracking().ProjectTo<AccountTypeGetDto>(_mapper.ConfigurationProvider).ToListAsync();
            return accountTypes;
        }

        public async Task<List<SelectListDto>> GetAccountTypeSelectList()
        {

            var accountTypesSelectList = await _dbContext.AccountTypes.AsNoTracking().Select(x => new SelectListDto
            {
                Name = x.Type,
                Id = x.Id,
            }).ToListAsync();
            return accountTypesSelectList;
        }

        public async Task<ResponseMessage> UpdateAccountType(AccountTypeGetDto accountType)
        {

            var currentAccountType = await _dbContext.AccountTypes.FirstOrDefaultAsync(x => x.Id.Equals(accountType.Id));

          
            if (currentAccountType != null)
            {
                currentAccountType.Type = accountType.Type;
                currentAccountType.Category = Enum.Parse<ACCOUNTTYPECATEGORY>(accountType.Category);
                currentAccountType.SubCategory = Enum.Parse<ACCOUNTTYPESUBCATEGORY>(accountType.SubCategory);
                currentAccountType.Normal_Balance = Enum.Parse<NORMALBALANCE>(accountType.Normal_Balance);
                currentAccountType.Remark = accountType.Remark;
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Data = currentAccountType, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }
    }
}
