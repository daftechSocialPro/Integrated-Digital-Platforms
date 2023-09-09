using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Vacancy;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Vacancy
{
    public class VacancyService : IVacancyService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public VacancyService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<VacancyListDto>> GetVacancyList()
        {
            return await _dbContext.VacancyLists.Include(x => x.Department)
                           .Include(x => x.Position)
                           .Include(x => x.EducationalLevel)
                           .Include(x => x.EducationalField)
                           .ProjectTo<VacancyListDto>
                           (_mapper.ConfigurationProvider)
                           .ToListAsync();
        }

        public async Task<ResponseMessage> AddVacancy(AddVacancyDto addVacancy)
        {
            VacancyList vacancy = new VacancyList()
            {
                Id = Guid.NewGuid(),
                CreatedById = addVacancy.CreatedById,
                CreatedDate = DateTime.Now,
                DepartmentId = addVacancy.DepartmentId,
                EducationalFieldId = addVacancy.EducationalFieldId,
                EducationalLevelId = addVacancy.EducationalLevelId,
                EmploymentType = addVacancy.EmploymentType,
                GPA = addVacancy.GPA,
                IsApproved = false,
                PositionId = addVacancy.PositionId,
                Quantity = addVacancy.Quantity,
                Rowstatus = RowStatus.ACTIVE,
                VacancyName = addVacancy.VacancyName,
                VacancyType = addVacancy.VacancyType,
                VaccancyDescription = addVacancy.VaccancyDescription,
                VaccancyStartDate = addVacancy.VaccancyStartDate,
                VaccancyEndDate = addVacancy.VaccancyEndDate
            };

            await _dbContext.VacancyLists.AddAsync(vacancy);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = false, Message = "Added Successfully", Data = addVacancy };
        }

        public async Task<ResponseMessage> UpdateVacancy(UpdateVacancyDto updateVacancy)
        {
            var currentVacancy = await _dbContext.VacancyLists.FirstOrDefaultAsync(x => x.Id.Equals(updateVacancy.Id) && !x.IsApproved);
            if (currentVacancy != null)
            {

                currentVacancy.DepartmentId = updateVacancy.DepartmentId;
                currentVacancy.EducationalFieldId = updateVacancy.EducationalFieldId;
                currentVacancy.EducationalLevelId = updateVacancy.EducationalLevelId;
                currentVacancy.EmploymentType = updateVacancy.EmploymentType;
                currentVacancy.GPA = updateVacancy.GPA;
                currentVacancy.PositionId = updateVacancy.PositionId;
                currentVacancy.Quantity = updateVacancy.Quantity;
                currentVacancy.VacancyName = updateVacancy.VacancyName;
                currentVacancy.VacancyType = updateVacancy.VacancyType;
                currentVacancy.VaccancyDescription = updateVacancy.VaccancyDescription;
                currentVacancy.VaccancyStartDate = updateVacancy.VaccancyStartDate;
                currentVacancy.VaccancyEndDate = updateVacancy.VaccancyEndDate;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = false, Message = "Updated Successfully", Data = currentVacancy };
            }

            return new ResponseMessage { Success = false, Message = "Could not find Vacancy" };

        }


        public IQueryable<VacancyList> ApplyVacancyFilter(IQueryable<VacancyList> query, List<FilterCriteria> filterCriteria,int pageNumber, int pageSize)
        {
            ParameterExpression parameter = Expression.Parameter(typeof(VacancyList), "x");
            Expression filterExpression = null;

            foreach (var item in filterCriteria)
            {
                PropertyInfo propertyInfo = typeof(VacancyList).GetProperty(item.ColumnName);

                MemberExpression property = Expression.Property(parameter, propertyInfo);
                ConstantExpression value = Expression.Constant(item.FilterValue);
                BinaryExpression binaryExpression = Expression.Equal(property, value);


                filterExpression = filterExpression == null ?
                                    binaryExpression :
                                    Expression.AndAlso(filterExpression, binaryExpression);
            }

            if (filterExpression != null)
            {
                var lambda = Expression.Lambda<Func<VacancyList, bool>>(filterExpression, parameter);
                query = query.Where(lambda);
            }

            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            return query;
        }

    }
}
