using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Helper;
using MembershipImplementation.Interfaces.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Services.Configuration
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfigService;
        private readonly IEmailService _emailService;
        public CourseService(ApplicationDbContext dbContext, IGeneralConfigService generalConfigService, IEmailService emailService)
        {
            _dbContext = dbContext;
            _generalConfigService = generalConfigService;
            _emailService = emailService;
        }


        public async Task<ResponseMessage> AddCourse(CoursePostDto CoursePost)
        {
            var filePath = "";

            if (CoursePost.File != null)
                filePath = await _generalConfigService.UploadFiles(CoursePost.File, CoursePost.FileName, "Courses");

            var members = await _dbContext.Members.Where(x=>x.MembershipTypeId==CoursePost.MembershipTypeId).ToListAsync();

            foreach (var member in members)
            {

                Course Course = new Course
                {
                    Id = Guid.NewGuid(),
                    FileName = CoursePost.FileName,
                    Description = CoursePost.Description,
                    FilePath = filePath,
                    MembershipTypeId = CoursePost.MembershipTypeId,
                    Rowstatus = RowStatus.ACTIVE,
                    CreatedById = CoursePost.CreatedById,
                    CreatedDate = DateTime.Now,
                    MemberId = member.Id,
                    IsVissible=false,

                };

                await _dbContext.Courses.AddAsync(Course);
                await _dbContext.SaveChangesAsync();

                var message = $"there is a new event {CoursePost.FileName} and description {CoursePost.Description}";
                var email = new EmailMetadata
                                    (member.Email, "ID Card Status",
                                        $"Dear {member.FullName},\n\n{message}." +
                                        $"\nThank you.\n\nSincerely,\nEMIA");
                await _emailService.Send(email);
            }

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<CourseGetDto>> GetCourseList(Guid membershipId)
        {
            var CourseList = await _dbContext.Courses.Include(x=>x.MembershipType).Where(x=>x.MembershipTypeId==membershipId).AsNoTracking().Select(x => new CourseGetDto
            {
                Id = x.Id,
                FileName = x.FileName,
                FilePath = x.FilePath,
                Description = x.Description,
                MembershipType = x.MembershipType.Name,
                MembershipTypeId= x.MembershipTypeId,
                CreatedAt = x.CreatedDate
               

            }).ToListAsync();

            return CourseList;
        }


        public async Task<List<CourseGetDto>> GetMemberEvents (Guid MemberId)
        {
            var CourseList = await _dbContext.Courses.Include(x => x.MembershipType).Where(x => x.MemberId== MemberId&& x.IsVissible== false).AsNoTracking().Select(x => new CourseGetDto
            {
                Id = x.Id,
                FileName = x.FileName,
                FilePath = x.FilePath,
                Description = x.Description,
                MembershipType = x.MembershipType.Name,
                MembershipTypeId = x.MembershipTypeId,
                CreatedAt = x.CreatedDate

            }).ToListAsync();

            return CourseList;

        }


        public async Task<CourseGetDto> GetSingleEvent(Guid eventId)
        {
            var Course = await _dbContext.Courses.Include(x => x.MembershipType).Where(x => x.Id == eventId ).AsNoTracking().Select(x => new CourseGetDto
            {
                Id = x.Id,
                FileName = x.FileName,
                FilePath = x.FilePath,
                Description = x.Description,
                MembershipType = x.MembershipType.Name,
                MembershipTypeId = x.MembershipTypeId,
                CreatedAt = x.CreatedDate

            }).FirstOrDefaultAsync();

            return Course;

        }

        public async Task<ResponseMessage> UpdateCourse(CourseGetDto CoursePost)
        {
            var currentCourse = await _dbContext.Courses.FirstOrDefaultAsync(x => x.Id == CoursePost.Id);

            if (currentCourse != null)
            {
                currentCourse.FileName = CoursePost.FileName;
                currentCourse.Description = CoursePost.Description;
                currentCourse.MembershipTypeId = CoursePost.MembershipTypeId;




                if (CoursePost.File != null)
                    currentCourse.FilePath = await _generalConfigService.UploadFiles(CoursePost.File, CoursePost.FileName, "Courses");

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCourse, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Course" };
        }


        public async Task<ResponseMessage> DeleteCourse(Guid CourseId)
        {
            var currentCourse = await _dbContext.Courses.FindAsync(CourseId);

            if (currentCourse != null)
            {
                _dbContext.Remove(currentCourse);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCourse, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Course" };


        }
    }
}
