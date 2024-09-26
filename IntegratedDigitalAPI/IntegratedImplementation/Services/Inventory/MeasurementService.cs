using AutoMapper;
using Implementation.Helper;
using Implementation.Interfaces.Inventory;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Inventory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace Implementation.Services.Inventory
{
    public class MeasurementService: IMeasurementService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public MeasurementService(ApplicationDbContext dbContext,IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddMeasurement(AddMeasurementUnitDto addMeasurement)
        {
            MeasurmentUnit measurement = new MeasurmentUnit
            {
                Id = Guid.NewGuid(),
                MeasurementType = (MeasurementType)addMeasurement.MeasurementType,
                CreatedDate= DateTime.Now,
                Name= addMeasurement.Name,
                AmharicName = addMeasurement.AmharicName,
                ToSIUnit = addMeasurement.ToSIUnit == null ? 1 : addMeasurement.ToSIUnit.Value,
            };

            await _dbContext.MeasurmentUnits.AddAsync(measurement);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = measurement,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<MeasurementListDto>> GetMeasurementList()
        {
            var measurements = await _dbContext.MeasurmentUnits.AsNoTracking().Select(x => new MeasurementListDto { 
                Id = x.Id.ToString(),
                MeasurementType = x.MeasurementType.ToString(),
                Name = x.Name,
               AmharicName = x.AmharicName,
                ToSIUnit = x.ToSIUnit
            }).ToListAsync();
            return measurements;
        }


        public async Task<ResponseMessage> UpdateMeasurement(AddMeasurementUnitDto updateMeasurement)
        {
            var currentMeasurement = await _dbContext.MeasurmentUnits.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(updateMeasurement.Id)));
            if (currentMeasurement != null)
            {
                currentMeasurement.MeasurementType = (MeasurementType)updateMeasurement.MeasurementType;
                currentMeasurement.Name = updateMeasurement.Name;
                currentMeasurement.AmharicName = updateMeasurement.AmharicName;
                currentMeasurement.ToSIUnit = updateMeasurement.ToSIUnit == null ? 1 : updateMeasurement.ToSIUnit.Value;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMeasurement, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Measurement" };
        }
    }
}
