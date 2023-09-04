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
          

            Department department = new Department
            {
                Id = Guid.NewGuid(),
                DepartmentName = departmentPost.DepartmentName,             
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
                Remark = x.Remark,
            }).ToListAsync();

            return departmentList;
        }

        public async Task<List<SelectListDto>> GetDepartmentDropdownList()
        {
            var departmentList = await _dbContext.Departments.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.DepartmentName,
            }).ToListAsync();

            return departmentList;
        }
   

        public async Task<ResponseMessage> UpdateDepartment(DepartmentGetDto department)
        {
            var currentDepartment = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(department.Id)));

            if (currentDepartment != null)
            {
                currentDepartment.DepartmentName = department.DepartmentName;
                currentDepartment.Remark = department.Remark;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentDepartment, Success = true,Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Department" };
        }
    }
}
