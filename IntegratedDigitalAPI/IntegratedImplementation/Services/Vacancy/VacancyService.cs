using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
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
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;

        public VacancyService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _generalConfig = generalConfig;
        }

        public async Task<List<VacancyListDto>> GetVacancyList(VacancyFilterDto filterDto)
        {

            var query = _dbContext.VacancyLists.Include(x => x.Department)
                .Include(x => x.Position)
                .Include(x => x.EducationalLevel)
                .Include(x => x.EducationalField)
                .AsQueryable();

            if (filterDto.Status != null)
            {
                query = query.Where(x => x.IsApproved == filterDto.Status);
            }

            if (filterDto.PositionId != null)
            {
                query = query.Where(x => x.PositionId == filterDto.PositionId);
            }

            if (filterDto.DepartmentId != null)
            {
                query = query.Where(x => x.DepartmentId == filterDto.DepartmentId);
            }

            if (filterDto.Date.HasValue)
            {
                query = query.Where(x => x.VaccancyStartDate >= filterDto.Date && x.VaccancyEndDate <= filterDto.Date);
            }

            var result = await query
                .ProjectTo<VacancyListDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return result;
        }

        public async Task<UpdateVacancyDto> GetVacancyEdit(Guid vacancyId)
        {
            var currentVacancy = await _dbContext.VacancyLists.ProjectTo<UpdateVacancyDto>(_mapper.ConfigurationProvider)
                         .FirstOrDefaultAsync(x => x.Id == vacancyId);
            if (currentVacancy != null)
            {
                return currentVacancy;
            }

            return new UpdateVacancyDto();
        }

        public async Task<VacancyListDto> GetVacancyDetail(Guid vacancyId)
        {
            var currentVacancy = await _dbContext.VacancyLists.ProjectTo<VacancyListDto>(_mapper.ConfigurationProvider)
                         .FirstOrDefaultAsync(x => x.Id == vacancyId);
            if (currentVacancy != null)
            {
                return currentVacancy;
            }
            return new VacancyListDto();
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

            return new ResponseMessage { Success = true, Message = "Added Successfully", Data = addVacancy };
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
                return new ResponseMessage { Success = true, Message = "Updated Successfully", Data = currentVacancy };
            }

            return new ResponseMessage { Success = false, Message = "Could not find Vacancy" };

        }

        public async Task<ResponseMessage> ApproveVacancy(Guid vacancyId)
        {
            var currentVacancy = await _dbContext.VacancyLists.FirstOrDefaultAsync(x => x.Id.Equals(vacancyId) && !x.IsApproved);
            if (currentVacancy != null)
            {
                currentVacancy.IsApproved = true;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Approved Successfully", Data = currentVacancy };
            }
            return new ResponseMessage { Success = false, Message = "Could not find Vacancy" };
        }


        public async Task<List<VacancyDocumentsDto>> GetVacancyDocuments(Guid vacancyId)
        {
            var currentDocument = await _dbContext.VacancyDocuments.Where(x => x.VacancyId.Equals(vacancyId))
                                        .Select(x => new VacancyDocumentsDto
                                        {
                                            Id = x.Id,
                                            DocuemntName = x.DocuemntName,
                                            DocumentPath = x.DocumentPath
                                        }).ToListAsync();
            return currentDocument;
        }

        public async Task<ResponseMessage> DeleteVacancyDocument(Guid vacancyDocId)
        {
            var VacancyDoc = await _dbContext.VacancyDocuments.FirstOrDefaultAsync(x => x.Id == vacancyDocId);
            if (VacancyDoc == null)
                return new ResponseMessage { Success = false, Message = "Vacancy Document Not found" };

            _dbContext.Remove(VacancyDoc);
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Delted Succesfully" };
        }

        public async Task<ResponseMessage> AddVacancyDocument(AddVacancyDocumentDto addVacancyDocument)
        {
            var Vacancy = await _dbContext.VacancyLists.FirstOrDefaultAsync(x => x.Id == addVacancyDocument.VacancyId);
            if (Vacancy == null)
                return new ResponseMessage { Success = false, Message = "Vacancy Not found" };

            var path = "";
            var Id = Guid.NewGuid();
            if (addVacancyDocument.DocumentPath != null)
                path = _generalConfig.UploadFiles(addVacancyDocument.DocumentPath, Id.ToString(), "Vacancy").Result.ToString();


            VacancyDocuments documents = new VacancyDocuments()
            {
                Id = Id,
                CreatedById = addVacancyDocument.CreatedById,
                CreatedDate = DateTime.Now,
                DocuemntName = addVacancyDocument.DocuemntName,
                DocumentPath = path,
                Rowstatus = RowStatus.ACTIVE,
                VacancyId = addVacancyDocument.VacancyId
            };

            await _dbContext.VacancyDocuments.AddAsync(documents);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public IQueryable<VacancyList> ApplyVacancyFilter(IQueryable<VacancyList> query, List<FilterCriteria> filterCriteria, int pageNumber, int pageSize)
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
