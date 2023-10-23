
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IUnitOfMeasurmentService
    {

        public Task<ResponseMessage> CreateUnitOfMeasurment(UnitOfMeasurmentPostDto unitOfMeasurment);

        public Task<ResponseMessage> UpdateUnitOfMeasurment(UnitOfMeasurmentGetDto unitOfMeasurment);

       public Task<List<UnitOfMeasurmentGetDto>> GetUnitOfMeasurment();



    }
}
