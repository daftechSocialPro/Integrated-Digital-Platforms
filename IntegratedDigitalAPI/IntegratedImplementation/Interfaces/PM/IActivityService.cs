

using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;

namespace IntegratedDigitalAPI.Services.PM.Activity
{
    public interface IActivityService
    {
        public Task<int> AddActivityDetails(ActivityDetailDto activityDetail);
        public Task<int> AddSubActivity(SubActivityDetailDto subActivity);

        public Task<int> AddTargetActivities(ActivityTargetDivisionDto targetDivisions);

        public Task<int> UpdateTargetActivities(ActivityTargetDivisionDto targetDivisions);
        public Task<ResponseMessage> AddProgress(AddProgressActivityDto activityProgress);
        public Task<ResponseMessage> UpdateProgress(AddProgressActivityDto activityProgress);

        public Task<List<ProgressViewDto>> ViewProgress(Guid actId);


        public Task<List<ActivityViewDto>> GetAssignedActivity(Guid employeeId);



        public Task<ResponseMessage> UpdateActivityProgress(UpdateActivityProgressDto updateActivityProgressDto);

       


        public Task <List<ActivityViewDto>> GetActivtiesForApproval (Guid employeeId);


        public Task<int> ApproveProgress(ApprovalProgressDto approvalProgressDto);


        public Task<List<ActivityAttachmentDto>> getAttachemnts(Guid taskId);

        public Task<ProgressViewDto> ViewDraftProgress(Guid actId);

        public Task<ActivityViewDto> GetSingleActivity(Guid actId);
        public Task<ResponseMessage> UpdateActivityDetails(ActivityDetailDto activityDetail);

        public Task<ResponseMessage> DeleteActivity(Guid activityId, Guid taskId);
        public Task<List<TerminatedEmployeeReplacmentDto>> GetTerminatedEmployeesActivies(Guid empId);
        public Task<ResponseMessage> ReplaceTerminatedEmployee(List<List<TerminatedEmployeeReplacmentGetDto>> ter, string userId);



        public Task<ResponseMessage> ChangeActivityStatus(Guid activityId, string? isCompleted, string? isCancel, string? isStarted);

        public Task<List<ActivityViewDto>> GetActivityForPlan(Guid employeeId, List<string> roles);

    }
}
