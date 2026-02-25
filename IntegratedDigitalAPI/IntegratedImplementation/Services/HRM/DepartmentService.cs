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
    public class DepartmentService : IDepartmentService
    {
        private readonly ApplicationDbContext _dbContext;

        public DepartmentService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddDepartment(DepartmentPostDto departmentPost)
        {
            var currDepartment = await _dbContext.Departments.AnyAsync(x => x.DepartmentName == departmentPost.DepartmentName);
            if (currDepartment)
            {
                return new ResponseMessage { Success = false, Message = "Department Already Exists!!" };
            }


            Department department = new Department
            {
                Id = Guid.NewGuid(),
                DepartmentName = departmentPost.DepartmentName,  
                AmharicName = departmentPost.AmharicName,
                Remark = departmentPost.Remark,
                CreatedById = departmentPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Departments.AddAsync(department);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = department,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<DepartmentGetDto>> GetDepartmentList()
        {
            var departmentList = await _dbContext.Departments.AsNoTracking().Select(x => new DepartmentGetDto
            {
                Id = x.Id.ToString(),
                DepartmentName =x.DepartmentName,
                AmharicName = x.AmharicName,
                Remark = x.Remark,
            }).ToListAsync();

            return departmentList;
        }

        public async Task<ResponseMessage> UpdateDepartment(DepartmentGetDto department)
        {
            var currentDepartment = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(department.Id)));

            var exists = await _dbContext.Departments.AnyAsync(x => x.DepartmentName == department.DepartmentName && x.Id != Guid.Parse(department.Id));
            if (exists)
            {
                return new ResponseMessage { Success = false, Message = "Department Already Exists!!" };
            }

            if (currentDepartment != null)
            {
                currentDepartment.DepartmentName = department.DepartmentName;
                currentDepartment.AmharicName = department.AmharicName;
                currentDepartment.Remark = department.Remark;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentDepartment, Success = true,Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }

        public async Task<IntegratedImplementation.DTOS.Common.DependencyCheckDto> CheckDependency(Guid departmentId)
        {
            var empCount = await _dbContext.EmploymentDetails.CountAsync(x => x.DepartmentId == departmentId);
            var projCount = await _dbContext.Projects.CountAsync(x => x.DepartmentId == departmentId);
            var vacCount = await _dbContext.VacancyLists.CountAsync(x => x.DepartmentId == departmentId);

            int total = empCount + projCount + vacCount;
            if (total > 0)
            {
                var msg = "This department is linked to ";
                var lst = new List<string>();
                if (empCount > 0) lst.Add($"{empCount} Employment Details");
                if (projCount > 0) lst.Add($"{projCount} Projects");
                if (vacCount > 0) lst.Add($"{vacCount} Vacancies");
                
                return new IntegratedImplementation.DTOS.Common.DependencyCheckDto { HasDependencies = true, Message = msg + string.Join(", ", lst) + "." };
            }
            return new IntegratedImplementation.DTOS.Common.DependencyCheckDto { HasDependencies = false, Message = "" };
        }

        public async Task<ResponseMessage> DeleteDepartment(Guid departmentId)
        {
            var department = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Id == departmentId);
            if (department != null)
            {
                var emps = await _dbContext.EmploymentDetails.Where(x => x.DepartmentId == departmentId).ToListAsync();
                if (emps.Any()) _dbContext.EmploymentDetails.RemoveRange(emps);

                var projs = await _dbContext.Projects.Where(x => x.DepartmentId == departmentId).ToListAsync();
                if (projs.Any()) _dbContext.Projects.RemoveRange(projs);

                var vacs = await _dbContext.VacancyLists.Where(x => x.DepartmentId == departmentId).ToListAsync();
                if (vacs.Any()) _dbContext.VacancyLists.RemoveRange(vacs);

                _dbContext.Departments.Remove(department);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }
    }
}
