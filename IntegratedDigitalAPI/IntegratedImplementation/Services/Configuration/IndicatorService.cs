

using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Common;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public class IndicatorService : IIndicatorService
    {


        private readonly ApplicationDbContext _dBContext;
        public IndicatorService(ApplicationDbContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage> CreateIndicator(IndicatorPostDto indicator)
        {

         
            var unitOfMeasurment = new Indicator
            {
                Id = Guid.NewGuid(),
                Name = indicator.Name,
                StrategicPlanId  = indicator.StratgicPlanId,
                Type = Enum.Parse<TypeStrategicPlanIndicator>(indicator.Type),
                CreatedDate = DateTime.Now,
                CreatedById= indicator.CreatedById
            };
            

            await _dBContext.Indicators.AddAsync(unitOfMeasurment);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
               
                Message = "Added Successfully",
                Success = true
            };

        }
        public async Task<List<IndicatorGetDto>> GetIndicator()
        {
            return await _dBContext.Indicators.Include(x=>x.StrategicPlan).AsNoTracking().Select(x=> new IndicatorGetDto
            {
                Id = x.Id,
                Name = x.Name,
                StratgicPlan= x.StrategicPlan.Name,
                StratgicPlanId = x.StrategicPlanId,
                Type = x.Type.ToString()
            }).ToListAsync();
        }

  

        public async Task<ResponseMessage> UpdateIndicator(IndicatorGetDto indicator)
        {

            var unitMeasurment = _dBContext.Indicators.Find(indicator.Id);

            unitMeasurment.Name = indicator.Name;
            unitMeasurment.StrategicPlanId= indicator.StratgicPlanId;
            unitMeasurment.Type = Enum.Parse<TypeStrategicPlanIndicator>(indicator.Type);
         
            _dBContext.Entry(unitMeasurment).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Updated Successfully",
                Success = true
            };

        }

        public async Task<List<IndicatorGetDto>> GetIndicatorByStrategicPlan(Guid strategicplanId)
        {
            return await _dBContext.Indicators.Where(x => x.StrategicPlanId == strategicplanId).Include(x => x.StrategicPlan).AsNoTracking().Select(x => new IndicatorGetDto
            {
                Id = x.Id,
                Name = x.Name,
                StratgicPlan = x.StrategicPlan.Name,
                StratgicPlanId = x.StrategicPlanId,
                Type = x.Type.ToString()
            }).ToListAsync();
        }

        public async Task<ResponseMessage> DeleteIndicator(Guid id)
        {
            try
            {
                var indicator = await _dBContext.Indicators.FirstOrDefaultAsync(x => x.Id == id);
                if(indicator == null)
                {
                    return new ResponseMessage { Success = false, Message = "Could not find indicator" };
                }

                var activity = await _dBContext.Activities.Where(x => x.StrategicPlanIndicatorId == indicator.Id).Select(x => x.ActivityDescription).ToListAsync();
                if (activity.Any())
                {
                    return new ResponseMessage { Success = false, Message = $" the following activites:- \n {string.Join("\n", activity)} use the Indicator please check them and try again!!" };
                }

                _dBContext.Indicators.Remove(indicator);
                await _dBContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Deleted Successfully!!" };

            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }
    }
}
