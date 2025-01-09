using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.FInance.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class PayrollSettingService : IPayrollSettingService
    {
        private readonly ApplicationDbContext _dbContext;

        public PayrollSettingService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<List<GeneralPayrollSettingListDto>> GetGeneralPayrollSettings()
        {
            var generalPayrollSetting = await _dbContext.GeneralPayrollSettings.
                                        AsNoTracking().Select(y => new GeneralPayrollSettingListDto
                                        {
                                            Id = y.Id.ToString(),
                                            GeneralPSetting = y.GeneralPSetting.ToString(),
                                            Value = y.Value,
                                        }).ToListAsync();

            return generalPayrollSetting;
        }

        public async Task<ResponseMessage> SaveGeneralPayrollSetting(GeneralPayrollSettingDto addPayrollSetting)
        {

            var currentSetting = await _dbContext.GeneralPayrollSettings.FirstOrDefaultAsync(x => x.GeneralPSetting == Enum.Parse<GeneralPSett>(addPayrollSetting.GeneralPSetting));

            if (currentSetting == null)
            {
                GeneralPayrollSetting generalPayroll = new GeneralPayrollSetting()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addPayrollSetting.CreatedById,
                    CreatedDate = DateTime.Now,
                    GeneralPSetting = Enum.Parse<GeneralPSett>(addPayrollSetting.GeneralPSetting),
                    Rowstatus = RowStatus.ACTIVE,
                    Value = addPayrollSetting.Value,
                };

                await _dbContext.GeneralPayrollSettings.AddAsync(generalPayroll);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage
                {
                    Data = generalPayroll,
                    Message = "Added Successfully",
                    Success = true
                };
            }
            else
            {
                currentSetting.Value = addPayrollSetting.Value;
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = currentSetting,
                    Message = "Added Successfully",
                    Success = true
                };
            }

        }


        

        public async Task<List<IncomeTaxDto>> GetIncomeTax()
        {
            var incomeTaxList = await _dbContext.IncomeTaxSettings.
                                      AsNoTracking().Select(y => new IncomeTaxDto
                                      {
                                          Id = y.Id.ToString(),
                                          EndDate = y.EndDate.Date,
                                          Deductable = y.Deductable,
                                          StartingAmount = y.StartingAmount,
                                          EndingAmount = y.EndingAmount,
                                          Percent = y.Percent,
                                          IsActive = y.Rowstatus == RowStatus.ACTIVE ? true : false
                                      }).ToListAsync();
            return incomeTaxList;
        }

        public async Task<ResponseMessage> AddIncomeTax(IncomeTaxDto addIncomeTax)
        {
            var incomeTaxExists = await _dbContext.IncomeTaxSettings.
                                    AnyAsync(x => x.StartingAmount >=
                                    addIncomeTax.StartingAmount &&
                                    x.EndingAmount <= addIncomeTax.EndingAmount
                                    && x.Rowstatus == RowStatus.ACTIVE);
            if (incomeTaxExists)
                return new ResponseMessage
                {
                    Message = "Income Tax Already Exists",
                    Success = false
                };

            IncomeTaxSetting taxSetting = new IncomeTaxSetting()
            {
                Id = Guid.NewGuid(),
                EndDate = addIncomeTax.EndDate,
                CreatedById = addIncomeTax.CreatedById,
                Deductable = addIncomeTax.Deductable,
                EndingAmount = addIncomeTax.EndingAmount,
                CreatedDate = DateTime.Now,
                Percent = addIncomeTax.Percent,
                StartingAmount = addIncomeTax.StartingAmount,
                Rowstatus = RowStatus.ACTIVE
            };
            await _dbContext.IncomeTaxSettings.AddAsync(taxSetting);
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Data = taxSetting,
                Message = "Added Successfully!!",
                Success = true
            };
        }

        public async Task<ResponseMessage> UpdateIncomeTax(IncomeTaxDto updateIncomeTax)
        {
            //var incomeTaxExists = await _dbContext.IncomeTaxSettings.
            //                         AnyAsync(x => x.StartingAmount >=
            //                         updateIncomeTax.StartingAmount &&
            //                         x.EndingAmount <= updateIncomeTax.EndingAmount
            //                         && x.Rowstatus == RowStatus.ACTIVE);
            //if (incomeTaxExists)
            //    return new ResponseMessage
            //    {
            //        Message = "Income Tax Already Exists",
            //        Success = false
            //    };


            var currentTax = await _dbContext.IncomeTaxSettings.FirstOrDefaultAsync(x => x.Id == Guid.Parse(updateIncomeTax.Id));

            if (currentTax == null)
                return new ResponseMessage
                {
                    Message = "Income Tax Not Found",
                    Success = false
                };

            currentTax.EndDate = updateIncomeTax.EndDate;
            //currentTax.CreatedById = updateIncomeTax.CreatedById;
            currentTax.Deductable = updateIncomeTax.Deductable;
            currentTax.EndingAmount = updateIncomeTax.EndingAmount;
            currentTax.Percent = updateIncomeTax.Percent;
            currentTax.StartingAmount = updateIncomeTax.StartingAmount;
            currentTax.Rowstatus = updateIncomeTax.IsActive == true ? RowStatus.ACTIVE : RowStatus.INACTIVE;
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Data = currentTax,
                Message = "Updated Successfully!!",
                Success = true
            };
        }

        public async Task<List<BenefitPayrollDto>> GetBenefitPayrolls()
        {
            List<BenefitPayrollDto> listOfBenefits = new List<BenefitPayrollDto>();

            var benefitList = await (from x in _dbContext.BenefitPayrolls
                                     group x by x.PayrollReportType into type
                                     select type.Key).ToListAsync();

            foreach(var item in benefitList)
            {
                var empLst = await _dbContext.BenefitPayrolls.Include(x => x.BenefitList).Where(x => x.PayrollReportType == item).ToListAsync();

                listOfBenefits.Add(new BenefitPayrollDto
                {
                    PayrollReportType = item.ToString(),
                    Taxable = empLst.First().Taxable,
                    BenefitLists = string.Join(",", empLst.Select(x => x.BenefitList.Name))
            });
            }

            return listOfBenefits;
        }

        public async Task<ResponseMessage> AddBenefitPayroll(AddBenefitPayroll addBenefitPayroll)
        {
            var benefitExists = await _dbContext.BenefitPayrolls.AnyAsync(x => addBenefitPayroll.BenefitId.Contains(x.BenefitListId.ToString()) && x.PayrollReportType != Enum.Parse<PayrollReportType>(addBenefitPayroll.PayrollReportType) );

            if(benefitExists)
            {
                return new ResponseMessage { Success = false, Message = "Benefit already exists please Check again!!" };
            }

            List<BenefitPayroll> removeNotIncluded = await _dbContext.BenefitPayrolls.Where(x => x.PayrollReportType == Enum.Parse<PayrollReportType>(addBenefitPayroll.PayrollReportType) && !addBenefitPayroll.BenefitId.Contains(x.BenefitListId.ToString())).ToListAsync();

            if (removeNotIncluded.Any())
            {
                _dbContext.RemoveRange(removeNotIncluded);
                await _dbContext.SaveChangesAsync();
            }

            foreach (var item in addBenefitPayroll.BenefitId)
            {
                var addNew = await _dbContext.BenefitPayrolls.FirstOrDefaultAsync(x => x.BenefitListId == Guid.Parse(item));

                if (addNew == null)
                {
                    BenefitPayroll benefitP = new BenefitPayroll()
                    {
                        Id = Guid.NewGuid(),
                        BenefitListId = Guid.Parse(item),
                        CreatedById = addBenefitPayroll.CreatedById,
                        CreatedDate = DateTime.Now,
                        Taxable = addBenefitPayroll.Taxable,
                        PayrollReportType = Enum.Parse<PayrollReportType>(addBenefitPayroll.PayrollReportType),
                        Rowstatus = RowStatus.ACTIVE,
                    };

                   await _dbContext.BenefitPayrolls.AddAsync(benefitP);
                   await _dbContext.SaveChangesAsync();
                }
                else
                {
                    addNew.Taxable = addBenefitPayroll.Taxable;
                    addNew.PayrollReportType = Enum.Parse<PayrollReportType>(addBenefitPayroll.PayrollReportType);
                    await _dbContext.SaveChangesAsync();
                }

            }

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }
    }
}
