

using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Models.Common;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public class UnitOfMeasurmentService : IUnitOfMeasurmentService
    {


        private readonly ApplicationDbContext _dBContext;
        public UnitOfMeasurmentService(ApplicationDbContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage> CreateUnitOfMeasurment(UnitOfMeasurmentPostDto UnitOfMeasurment)
        {


            var unitOfMeasurment = new UnitOfMeasurment
            {
                Id = Guid.NewGuid(),
                Name = UnitOfMeasurment.Name,
                LocalName = UnitOfMeasurment.LocalName,
                Type = Enum.Parse<MeasurmentType>(UnitOfMeasurment.Type),
                CreatedDate = DateTime.Now,
                CreatedById= UnitOfMeasurment.CreatedById
            };
            

            await _dBContext.UnitOfMeasurment.AddAsync(unitOfMeasurment);
            await _dBContext.SaveChangesAsync();

            return new ResponseMessage
            {
               
                Message = "Added Successfully",
                Success = true
            };

        }
        public async Task<List<UnitOfMeasurmentGetDto>> GetUnitOfMeasurment()
        {



            return await _dBContext.UnitOfMeasurment.AsNoTracking().Select(x=> new UnitOfMeasurmentGetDto
            {
                Id = x.Id,
                Name = x.Name,
                LocalName= x.LocalName,
                Type = x.Type.ToString()


            }).ToListAsync();
            
        }

  

        public async Task<ResponseMessage> UpdateUnitOfMeasurment(UnitOfMeasurmentGetDto unitOfMeasurmentDto)
        {

            var unitMeasurment = _dBContext.UnitOfMeasurment.Find(unitOfMeasurmentDto.Id);

            unitMeasurment.Name = unitOfMeasurmentDto.Name;
            unitMeasurment.LocalName= unitOfMeasurmentDto.LocalName;
            unitMeasurment.Type = Enum.Parse<MeasurmentType>(unitOfMeasurmentDto.Type);
         
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
