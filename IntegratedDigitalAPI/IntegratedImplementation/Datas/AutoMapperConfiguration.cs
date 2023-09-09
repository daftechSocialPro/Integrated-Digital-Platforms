using AutoMapper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Vacancy;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedImplementation.Datas
{
    public class AutoMapperConfigurations : Profile
    {

        public AutoMapperConfigurations()
        {

             CreateMap<EmployeeList, EmployeeGetDto>()
                .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
                .ForMember(a => a.EmployeeName, e => e.MapFrom(mfg => $"{mfg.FirstName} {mfg.MiddleName} {mfg.LastName}"))
                .ForMember(a => a.ZoneName, e => e.MapFrom(mfg => mfg.Zone.ZoneName))
                .ForMember(a => a.RegionName, e => e.MapFrom(mfg => mfg.Zone.Region.RegionName))
                .ForMember(a => a.Nationality, e => e.MapFrom(mfg => mfg.Zone.Region.Country.Nationality))
                .ForMember(a => a.DepartmentName, e => e.MapFrom(mfg => mfg.EmployeeDetail.FirstOrDefault(x => x.Rowstatus == RowStatus.ACTIVE)!.Department.DepartmentName))
                .ForMember(a => a.PostionName, e => e.MapFrom(mfg => mfg.EmployeeDetail.FirstOrDefault(x => x.Rowstatus == RowStatus.ACTIVE)!.Position.PositionName))
                .ForMember(a => a.EmploymentStatus, e => e.MapFrom(mfg => mfg.EmploymentStatus.ToString()))
                .ForMember(a => a.CountryId, e => e.MapFrom(mfg => mfg.Zone.Region.CountryId))
                .ForMember(a => a.RegionId, e => e.MapFrom(mfg => mfg.Zone.RegionId));

            CreateMap<EmploymentDetail, EmployeeHistoryDto>()
                .ForMember(a => a.DepartmentName, e => e.MapFrom(mfg => mfg.Department.DepartmentName))
                .ForMember(a => a.PositionName, e => e.MapFrom(mfg => mfg.Position.PositionName));

            CreateMap<EmployeeFamily, EmployeeFamilyGetDto>()
                .ForMember(a => a.Gender, e => e.MapFrom(mfg => mfg.Gender.ToString()))
                .ForMember(a => a.FamilyRelation, e => e.MapFrom(mfg => mfg.FamilyRelation.ToString()));


            CreateMap<EmployeeEducation, EmployeeEducationGetDto>()
                .ForMember(a => a.EducationalField, e => e.MapFrom(mfg => mfg.EducationalField.EducationalFieldName))
                .ForMember(a => a.EducationalLevel, e => e.MapFrom(mfg => mfg.EducationalLevel.EducationalLevelName));

            CreateMap<CompanyProfile, CompanyProfileGetDto>();

            CreateMap<GeneralCodes, GeneralCodeDto>()
                .ForMember(a=>a.GeneralCode , e => e.MapFrom(mfg =>mfg.GeneralCodeType.ToString()));

            CreateMap<VacancyList, VacancyListDto>()
                .ForMember(x => x.EducationalLevel, e => e.MapFrom(mfg => mfg.EducationalLevel.EducationalLevelName))
                .ForMember(x => x.EducationalField, e => e.MapFrom(mfg => mfg.EducationalField.EducationalFieldName))
                .ForMember(x => x.Position, e => e.MapFrom(mfg => mfg.Position.PositionName))
                .ForMember(x => x.Department, e => e.MapFrom(mfg => mfg.Department.DepartmentName))
                .ForMember(x => x.EmploymentType, e => e.MapFrom(mfg => mfg.EmploymentType.ToString()))
                .ForMember(x => x.VacancyType, e => e.MapFrom(mfg => mfg.VacancyType.ToString()));

        }
    }
}
