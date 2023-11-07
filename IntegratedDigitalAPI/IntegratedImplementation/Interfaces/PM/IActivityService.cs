

using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;

namespace IntegratedDigitalAPI.Services.PM.Activity
{
    public interface IActivityService
    {
        public Task<int> AddActivityDetails(ActivityDetailDto activityDetail);
        public Task<int> AddSubActivity(SubActivityDetailDto subActivity);

        public Task<int> AddTargetActivities(ActivityTargetDivisionDto targetDivisions);

        public Task<ResponseMessage> AddProgress(AddProgressActivityDto activityProgress);
        public Task<ResponseMessage> UpdateProgress(AddProgressActivityDto activityProgress);

        public Task<List<ProgressViewDto>> ViewProgress(Guid actId);


        public Task<List<ActivityViewDto>> GetAssignedActivity(Guid employeeId);


       


        public Task <List<ActivityViewDto>> GetActivtiesForApproval (Guid employeeId);


        public Task<int> ApproveProgress(ApprovalProgressDto approvalProgressDto);


        public Task<List<ActivityAttachmentDto>> getAttachemnts(Guid taskId);

        public Task<ProgressViewDto> ViewDraftProgress(Guid actId);


    }
}
