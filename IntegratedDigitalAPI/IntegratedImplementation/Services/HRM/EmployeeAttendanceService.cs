using Implementation.Helper;
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
    public class EmployeeAttendanceService : IEmployeeAttendanceService
    {
        private readonly ApplicationDbContext _dbContext;

        public EmployeeAttendanceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<List<EmployeeFingerPrintListDto>> GetFingerPrintEmployees()
        {
            var emplloyees = await _dbContext.EmployeeFingerPrints.AsNoTracking().Include(x => x.Employee)
                              .Where(x => x.Employee.EmploymentStatus == EmploymentStatus.ACTIVE)
                              .OrderBy(x => x.Employee.FirstName).
                             ThenBy(x => x.Employee.MiddleName).ThenBy(x => x.Employee.LastName)
                            .Select(x =>
                              new EmployeeFingerPrintListDto
                              {
                                  Id = x.Id,
                                  FingerPrint = x.FingerPrintCode,
                                  Department = _dbContext.EmploymentDetails.Any(X => x.EmployeeId == x.Id && x.Rowstatus == RowStatus.ACTIVE) ?
                                    _dbContext.EmploymentDetails.Include(x => x.Department).First(X => x.EmployeeId == x.Id && x.Rowstatus == RowStatus.ACTIVE).Department.DepartmentName : "",
                                  FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}"
                              }).ToListAsync();
            return emplloyees;
        }

        public async Task<ResponseMessage> AddFingerPrint(AddEmployeeFingerPrintDto fingerPrintDto)
        {

            var currentFinger = await _dbContext.EmployeeFingerPrints.AnyAsync(x => x.FingerPrintCode.Equals(fingerPrintDto.FingerPrint));
            if (currentFinger)
                return new ResponseMessage { Success = false, Message = "Finger print code already exists" };

            var currEmployee = await _dbContext.EmployeeFingerPrints.AnyAsync(x => x.EmployeeId.Equals(fingerPrintDto.EmployeeId));
            if (currEmployee)
                return new ResponseMessage { Success = false, Message = "Employee is already registered" };

            EmployeeFingerPrint empFinger = new EmployeeFingerPrint()
            {
                Id = Guid.NewGuid(),
                CreatedById = fingerPrintDto.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = fingerPrintDto.EmployeeId,
                FingerPrintCode = fingerPrintDto.FingerPrint,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.EmployeeFingerPrints.AddAsync(empFinger);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Success", Data = empFinger.Id };
        }

        public async Task<ResponseMessage> AddShift(ShiftListDto addShiftDto)
        {
            var shift = new ShiftList()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addShiftDto.CreatedById,
                BreakTime = addShiftDto.BreakTime,
                CheckIn = addShiftDto.CheckIn,
                CheckOut = addShiftDto.CheckOut,
                ShiftName = addShiftDto.ShiftName,
                AmharicShiftName = addShiftDto.AmharicShiftName,
                Rowstatus = RowStatus.ACTIVE,
            };
            _dbContext.ShiftLists.Add(shift);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Saved Successfully", Data = shift.Id };
        }

      

        public async Task<List<ShiftListDto>> GetShiftLists()
        {
            var shiftList = await _dbContext.ShiftLists.AsNoTracking().Select(x => new ShiftListDto
            {
                Id = x.Id.ToString(),
                ShiftName = x.ShiftName,
                AmharicShiftName = x.AmharicShiftName,
                CheckIn = x.CheckIn,
                CheckOut = x.CheckOut,
                BreakTime = x.BreakTime
            }).ToListAsync();
            return shiftList;
        }

        public async Task<ResponseMessage> UpdateShift(ShiftListDto shiftListDto)
        {
            var shifts = await _dbContext.ShiftLists.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(shiftListDto.Id)));

            if (shifts != null)
            {
                shifts.BreakTime = shiftListDto.BreakTime;
                shifts.CheckIn = shiftListDto.CheckIn;
                shifts.CheckOut = shiftListDto.CheckOut;
                shifts.ShiftName = shiftListDto.ShiftName;
                shifts.AmharicShiftName = shiftListDto.AmharicShiftName;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Updated Successfully" };
            }

            return new ResponseMessage { Success = false, Message = "Shift Could Not be found!!" };
        }

        public async Task<ResponseMessage> BindShift(BindShiftDto bindShift)
        {
            var currentShift = await _dbContext.EmployeeShifts.FirstOrDefaultAsync(x => x.Id == bindShift.EmployeeId);

            if(currentShift == null)
            {
                EmployeeShift empShift = new EmployeeShift()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = bindShift.CreatedById,
                    CreatedDate = DateTime.Now,
                    EmployeeId = bindShift.EmployeeId,
                    ShiftListId = bindShift.ShiftId,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.EmployeeShifts.AddAsync(empShift);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Success = true, Message = "Added Shift Successfully" };
            }
            else
            {
                currentShift.ShiftListId = bindShift.ShiftId;

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Success = true, Message = "Updated Shift Successfully" };
            }
        }
    }
}
