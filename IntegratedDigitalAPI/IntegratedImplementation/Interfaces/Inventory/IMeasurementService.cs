using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Implementation.Interfaces.Inventory
{
    public interface IMeasurementService
    {
        Task<List<MeasurementListDto>> GetMeasurementList();
        Task<ResponseMessage> UpdateMeasurement(AddMeasurementUnitDto updateMeasurement);
        Task<ResponseMessage> AddMeasurement(AddMeasurementUnitDto addMeasurement);
    }
}
