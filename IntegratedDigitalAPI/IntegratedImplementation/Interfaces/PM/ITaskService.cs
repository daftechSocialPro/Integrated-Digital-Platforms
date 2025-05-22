
using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedDigitalAPI.Services.PM
{
    public interface ITaskService
    {

        public Task<int> CreateTask(TaskDto task);

        public Task<TaskVIewDto> GetSingleTask(Guid taskId,int? year);


        public Task<int> AddTaskMemebers(TaskMembersDto taskMembers);

        public Task<int> AddTaskMemo(TaskMemoRequestDto taskMemo);


        public Task<List<SelectListDto>> GetEmployeesNoTaskMembersSelectList(Guid taskId);


        public Task<List<SelectListDto>> GetTasksSelectList(Guid PlanId);

        public Task<List<SelectListDto>> GetActivitieParentsSelectList(Guid TaskId);
        public Task<List<SelectListDto>> GetActivitiesSelectList(Guid? planId, Guid? taskId, Guid? actParentId);
        public Task<ResponseMessage> UpdateTask(TaskDto updateTask);
        public Task<ResponseMessage> DeleteTask(Guid taskId);


    }
}
