using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
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
                ShiftDetails = _dbContext.ShiftDetails.Where(z => z.ShiftId == x.Id).Select(y => new ShiftDetailDto
                {
                    Id = y.Id,
                    BreakTime = y.BreakTime,
                    WeekDays = y.WeekDays
                }).ToList()
            }).ToListAsync();
            return shiftList;
        }

        public async Task<ResponseMessage> UpdateShift(ShiftListDto shiftListDto)
        {
            var shifts = await _dbContext.ShiftLists.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(shiftListDto.Id)));

            if (shifts != null)
            {
                shifts.CheckIn = shiftListDto.CheckIn;
                shifts.CheckOut = shiftListDto.CheckOut;
                shifts.ShiftName = shiftListDto.ShiftName;
                shifts.AmharicShiftName = shiftListDto.AmharicShiftName;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Updated Successfully" };
            }

            return new ResponseMessage { Success = false, Message = "Shift Could Not be found!!" };
        }

        public async Task<ResponseMessage> AddShiftDetail(AddShiftDetail addShiftDetail)
        {
            var currentShift = await _dbContext.ShiftDetails.AnyAsync(X => X.ShiftId == addShiftDetail.ShiftId && X.WeekDays == addShiftDetail.WeekDays);
            if (currentShift)
                return new ResponseMessage { Success = false, Message = "Data already exists" };

            ShiftDetail detail = new ShiftDetail()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addShiftDetail.CreatedById,
                BreakTime = addShiftDetail.BreakTime,
                WeekDays = addShiftDetail.WeekDays,
                ShiftId = addShiftDetail.ShiftId,
                Rowstatus = RowStatus.ACTIVE,
            };
            _dbContext.ShiftDetails.Add(detail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Saved Successfully" };
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

        public async Task<List<PenaltyListDto>> GetPenaltyLists()
        {
            var penalty = await _dbContext.EmployeePenalty.AsNoTracking().Where(x => x.Employee.EmploymentStatus == EmploymentStatus.ACTIVE).Include(x => x.Employee)
                            .Select(x =>
                              new PenaltyListDto
                              {
                                  Id = x.Id.ToString(),
                                  FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                  Amount = x.Amount,
                                  PenalityendDate = x.PenalityendDate,
                                  PenaltyDate = x.PenaltyDate,
                                  PenaltyType = x.PenaltyType.ToString(),
                                  Recursive = x.Recursive,
                                  Remark = x.Remark,
                                  FromSalary = x.FromSalary,
                                  TotNumber = x.TotNumber,
                                  Approved = x.Rowstatus == RowStatus.ACTIVE ? true : false
                              }).OrderByDescending(x => x.PenaltyDate).ToListAsync();
            return penalty;
        }

        public async Task<ResponseMessage> AddPenalty(AddPenaltyDto addPenalty)
        {
            var currSalary = await _dbContext.EmployeeSalaries.Include(x => x.EmploymentDetail).FirstOrDefaultAsync(x => x.EmploymentDetail.EmployeeId.Equals(Guid.Parse(addPenalty.EmployeeId)) && x.Rowstatus == RowStatus.ACTIVE);

            if (currSalary == null)
                return new ResponseMessage { Success = false, Message = "Please set sallary first!!" };

            EmployeePenalty penalty = new EmployeePenalty()
            {
                Id = Guid.NewGuid(),
                Amount = addPenalty.Amount,
                CreatedById = addPenalty.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = Guid.Parse(addPenalty.EmployeeId),
                PenalityendDate = addPenalty.PenalityendDate,
                FromSalary = addPenalty.FromSalary,
                TotNumber = addPenalty.TotNumber,
                PenaltyDate = addPenalty.PenaltyDate.AddDays(1),
                PenaltyType = addPenalty.PenaltyType,
                Recursive = addPenalty.Recursive,
                Remark = addPenalty.Remark,
                Rowstatus = RowStatus.ACTIVE
            };

            if (addPenalty.FromSalary)
            {
                if (addPenalty.PenaltyType == PenaltyType.ABSENT)
                {
                    var TotAmount = (currSalary.Amount / 26.0) * addPenalty.TotNumber;
                    penalty.Amount = TotAmount;
                }
                else if (addPenalty.PenaltyType == PenaltyType.LATE)
                {
                    var TotAmount = (currSalary.Amount / 208) * addPenalty.TotNumber;
                    penalty.Amount = TotAmount;
                }
            }

            await _dbContext.EmployeePenalty.AddAsync(penalty);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Created Successully!!", Data = penalty.Id };
        }

        public async Task<ResponseMessage> ChangeStatusofPenalty(string penaltyId)
        {
            var penalty = await _dbContext.EmployeePenalty.FindAsync(Guid.Parse(penaltyId));
            if (penalty != null)
            {
                penalty.Rowstatus = penalty.Rowstatus == RowStatus.ACTIVE ? RowStatus.INACTIVE : RowStatus.ACTIVE;

                await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Success = true, Message = "Updated Successfully" };
            }

            return new ResponseMessage { Success = false, Message = "Penality Not Found" };
        }

    }
}
