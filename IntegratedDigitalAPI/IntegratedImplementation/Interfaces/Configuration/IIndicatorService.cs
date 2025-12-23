
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IIndicatorService
    {

        public Task<ResponseMessage> CreateIndicator(IndicatorPostDto indicator);

        public Task<ResponseMessage> UpdateIndicator(IndicatorGetDto indicator);
        public Task<ResponseMessage> DeleteIndicator(Guid id);

       public Task<List<IndicatorGetDto>> GetIndicator();

        public Task<List<IndicatorGetDto>> GetIndicatorByStrategicPlan(Guid strategicplanId);


    }
}
