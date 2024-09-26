using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface ICourseService
    {
        Task<ResponseMessage> AddCourse(CoursePostDto CoursePost);
        Task<List<CourseGetDto>> GetCourseList(Guid MembershipId);
        Task<CourseGetDto> GetSingleEvent(Guid eventId);
        Task<ResponseMessage> UpdateCourse(CourseGetDto CoursePost);

        Task<ResponseMessage> DeleteCourse(Guid CourseId);

        Task<List<CourseGetDto>> GetMemberEvents(Guid MemberId);
    }
}
