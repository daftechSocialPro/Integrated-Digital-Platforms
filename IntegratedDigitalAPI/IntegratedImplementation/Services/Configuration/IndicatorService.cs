

using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
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
                Type = Enum.Parse<TypeOfIndicator>(indicator.Type),
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
            unitMeasurment.Type = Enum.Parse<TypeOfIndicator>(indicator.Type);
         
            _dBContext.Entry(unitMeasurment).State = EntityState.Modified;
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Updated Successfully",
                Success = true
            };

        }
    }
}
