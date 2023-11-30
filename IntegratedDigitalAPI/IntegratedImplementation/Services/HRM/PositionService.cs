using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class PositionService : IPositionService
    {
        private readonly ApplicationDbContext _dbContext;

        public PositionService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddPosition(PositionPostDto PositionPost)
        {
            var exists = await _dbContext.Positions.AnyAsync(x => x.PositionName == PositionPost.PositionName);

            if (exists)
                return new ResponseMessage { Message = "Position Already Exists", Success = false };

            Position Position = new Position
            {
                Id = Guid.NewGuid(),
                PositionName = PositionPost.PositionName,
                AmharicName = PositionPost.AmharicName,
                CreatedById = PositionPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Positions.AddAsync(Position);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = Position,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<PositionGetDto>> GetPositionList()
        {
            var PositionList = await _dbContext.Positions.AsNoTracking().Select(x => new PositionGetDto
            {
                Id = x.Id.ToString(),
                PositionName = x.PositionName,
                AmharicName = x.AmharicName,
            }).ToListAsync();

            return PositionList;
        }
        
        public async Task<ResponseMessage> UpdatePosition(PositionGetDto Position)
        {

            var exists = await _dbContext.Positions.AnyAsync(x => x.PositionName == Position.PositionName && x.Id != Guid.Parse(Position.Id));
            if (exists)
                return new ResponseMessage { Message = "Position Already Exists", Success = false };

            var currentPosition = await _dbContext.Positions.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(Position.Id)));

            if (currentPosition != null)
            {
                currentPosition.PositionName = Position.PositionName;
                currentPosition.AmharicName = Position.AmharicName;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message="Position Updated Successfully", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Position" };
        }
    }
}
