using Microsoft.EntityFrameworkCore;
using IntegratedDigitalAPI.DTOS.PM;
using System.Collections.Immutable;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Models.PM;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedDigitalAPI.Services.PM.Commite
{
    public class CommiteService: ICommiteService
    {
        private readonly ApplicationDbContext _dBContext;
        public CommiteService(ApplicationDbContext context)
        {
            _dBContext = context;
        }

        public async Task<int> AddCommite(AddCommiteDto addCommiteDto)
        {
            var Commite = new ProjectTeam
            {
                Id = Guid.NewGuid(),
                ProjectTeamName = addCommiteDto.Name,
                CreatedDate = DateTime.Now,
                CreatedById = addCommiteDto.CreatedBy.ToString(),
              
            };
            await _dBContext.AddAsync(Commite);
            await _dBContext.SaveChangesAsync();
            return 1;
        }

        public async Task<List<CommiteListDto>> GetCommiteLists()
        {
            return  await (from t in _dBContext.ProjectTeams.Include(x=>x.Employees).AsNoTracking()
                         select new CommiteListDto
                         {
                             Id = t.Id,
                             Name= t.ProjectTeamName,
                             NoOfEmployees = t.Employees.Count(),
                             EmployeeList = t.Employees.Select(e => new SelectListDto
                             {
                                 Name = $"{e.Employee.FirstName} {e.Employee.MiddleName}",
                                 //CommiteeStatus = e.CommiteeEmployeeStatus.ToString(),
                                 Id = e.Employee.Id,
                             }).ToList(),
                           
                         }).ToListAsync();

            
        }

        public async Task<List<SelectListDto>> GetNotIncludedEmployees(Guid CommiteId)
        {
            var EmployeeSelectList = await (from e in _dBContext.Employees.Include(x => x.EmployeeDetail).ThenInclude(x => x.Department)

                                            where !(_dBContext.ProjectTeamEmployees.Where(x => x.ProjectTeamId.Equals(CommiteId)).Select(x => x.EmployeeId).Contains(e.Id))
                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = $"{e.FirstName} {e.MiddleName} {e.LastName}" + (e.EmployeeDetail.Any() ? e.EmployeeDetail.OrderByDescending(x => x.CreatedDate).FirstOrDefault().Department.DepartmentName : "")

                                            }).ToListAsync();

            return EmployeeSelectList;
        }

        public async Task<int> UpdateCommite(UpdateCommiteDto updateCommite)
        {
            var currentCommite = await _dBContext.ProjectTeams.FirstOrDefaultAsync(x => x.Id.Equals(updateCommite.Id));
            if (currentCommite != null)
            {
                currentCommite.ProjectTeamName = updateCommite.Name;
                //currentCommite.Remark = updateCommite.Remark;
                //currentCommite.RowStatus = updateCommite.RowStatus;
                await _dBContext.SaveChangesAsync();

                return 1;
            }
            return 0;
        }

        public async Task<int> AddEmployeestoCommitte(CommiteEmployeesdto commiteEmployeesdto)
        {

            foreach (var c in commiteEmployeesdto.EmployeeList)
            {

                var committeeemployee = new ProjectTeamEmployees
                {
                    Id = Guid.NewGuid(),
                    ProjectTeamId = commiteEmployeesdto.CommiteeId,
                    EmployeeId = c,
                    CreatedDate=DateTime.Now,
                    CreatedById = commiteEmployeesdto.CreatedBy.ToString(),

                };

              await  _dBContext.AddAsync(committeeemployee);
              await  _dBContext.SaveChangesAsync();

             }

            return 1;

        }
        public async Task<int> RemoveEmployeestoCommitte(CommiteEmployeesdto commiteEmployeesdto)
        {

            foreach (var c in commiteEmployeesdto.EmployeeList)
            {

                var emp = _dBContext.ProjectTeamEmployees.Where(x => x.ProjectTeamId == commiteEmployeesdto.CommiteeId && x.EmployeeId == c);

                _dBContext.RemoveRange(emp);
             await   _dBContext.SaveChangesAsync();

            }

            return 1;

        }

        public async Task<List<SelectListDto>> GetSelectListCommittee()
        {

            return await (from c in _dBContext.ProjectTeams
                          select new SelectListDto
                          {
                              Id = c.Id,
                              Name= c.ProjectTeamName
                          }).ToListAsync();
        }

        public async Task<List<SelectListDto>> GetCommiteeEmployees(Guid comitteId)
        {

            return await _dBContext.ProjectTeamEmployees.Include(x=>x.Employee).Where(x=>x.ProjectTeamId==comitteId).Select(x=> new SelectListDto
            {
                Id = x.Id,
                Name= $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                //CommiteeStatus = x.CommiteeEmployeeStatus.ToString(),
                
            }).ToListAsync();
        }

       
    }
}
