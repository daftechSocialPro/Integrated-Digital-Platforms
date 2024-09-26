using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeeAttendanceService
    {
        Task<List<EmployeeFingerPrintListDto>> GetFingerPrintEmployees();
        Task<ResponseMessage> AddFingerPrint(AddEmployeeFingerPrintDto fingerPrintDto);
        Task<List<ShiftListDto>> GetShiftLists();
        Task<ResponseMessage> AddShift(ShiftListDto addShiftDto);
        Task<ResponseMessage> BindShift(BindShiftDto bindShift);
        Task<ResponseMessage> UpdateShift(ShiftListDto shiftListDto);
        Task<ResponseMessage> AddShiftDetail(AddShiftDetail addShiftDetail);

        Task<ResponseMessage> UpdateFingerPrint(UpdateEmployeeFingerPrintDto fingerPrintDto);

        Task<List<PenaltyListDto>> GetPenaltyLists();
        Task<ResponseMessage> AddPenalty(AddPenaltyDto addPenalty);
        Task<ResponseMessage> ChangeStatusofPenalty(string penaltyId);
    }
}
