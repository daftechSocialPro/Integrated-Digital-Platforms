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
using IntegratedInfrustructure.Model.Training;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedInfrustructure.Models.Inventory;

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
               .ForMember(a => a.NationalityId, e => e.MapFrom(mfg => mfg.Zone.Region.Country.Id))
               .ForMember(a => a.EmploymentStatus, e => e.MapFrom(mfg => mfg.EmploymentStatus.ToString()))
               .ForMember(a => a.CountryId, e => e.MapFrom(mfg => mfg.Zone.Region.CountryId))
               .ForMember(a =>  a.IsApproved, e => e.MapFrom(mfg => mfg.IsApproved))
               .ForMember(a => a.RegionId, e => e.MapFrom(mfg => mfg.Zone.RegionId));


            CreateMap<Volunter, VolunterGetDto>()
               .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
               .ForMember(a => a.EmployeeName, e => e.MapFrom(mfg => $"{mfg.FirstName} {mfg.MiddleName} {mfg.LastName}"))
               .ForMember(a => a.ZoneName, e => e.MapFrom(mfg => mfg.Zone.ZoneName))
               .ForMember(a => a.RegionName, e => e.MapFrom(mfg => mfg.Zone.Region.RegionName))
               .ForMember(a => a.Nationality, e => e.MapFrom(mfg => mfg.Zone.Region.Country.Nationality))
               .ForMember(a => a.NationalityId, e => e.MapFrom(mfg => mfg.Zone.Region.Country.Id))
       
               .ForMember(a => a.CountryId, e => e.MapFrom(mfg => mfg.Zone.Region.CountryId))
               .ForMember(a => a.RegionId, e => e.MapFrom(mfg => mfg.Zone.RegionId));


            CreateMap<EmploymentDetail, EmployeeHistoryDto>()
                .ForMember(a => a.DepartmentName, e => e.MapFrom(mfg => mfg.Department.DepartmentName))
                .ForMember(a => a.RowStatus, e => e.MapFrom(mfg => mfg.Rowstatus.ToString()))
                .ForMember(a => a.PositionName, e => e.MapFrom(mfg => mfg.Position.PositionName));

            CreateMap<EmployeeSalary, EmployeeSalaryGetDto>()
                .ForMember(a => a.ProjectName, e => e.MapFrom(mfg => mfg.ProjectName))
                .ForMember(a => a.Amount, e => e.MapFrom(mfg => mfg.Amount));




            CreateMap<EmployeeFamily, EmployeeFamilyGetDto>()
                .ForMember(a => a.Gender, e => e.MapFrom(mfg => mfg.Gender.ToString()))
                .ForMember(a => a.FamilyRelation, e => e.MapFrom(mfg => mfg.FamilyRelation.ToString()));

            CreateMap<EmployeeFile, EmployeeFileGetDto>();
            CreateMap<EmployeeSurety, EmployeeSuertyGetDto>();



            CreateMap<EmployeeEducation, EmployeeEducationGetDto>()
                .ForMember(a => a.EducationalField, e => e.MapFrom(mfg => mfg.EducationalField.EducationalFieldName))
                .ForMember(a => a.EducationalLevel, e => e.MapFrom(mfg => mfg.EducationalLevel.EducationalLevelName));

            CreateMap<CompanyProfile, CompanyProfileGetDto>();

            CreateMap<GeneralCodes, GeneralCodeDto>()
                .ForMember(a => a.GeneralCode, e => e.MapFrom(mfg => mfg.GeneralCodeType.ToString()));

            CreateMap<VacancyList, VacancyListDto>()
                .ForMember(x => x.EducationalLevel, e => e.MapFrom(mfg => mfg.EducationalLevel.EducationalLevelName))
                .ForMember(x => x.EducationalField, e => e.MapFrom(mfg => mfg.EducationalField.EducationalFieldName))
                .ForMember(x => x.Position, e => e.MapFrom(mfg => mfg.Position.PositionName))
                .ForMember(x => x.Department, e => e.MapFrom(mfg => mfg.Department.DepartmentName))
                .ForMember(x => x.EmploymentType, e => e.MapFrom(mfg => mfg.EmploymentType.ToString()))
                .ForMember(x => x.VacancyType, e => e.MapFrom(mfg => mfg.VacancyType.ToString()))
                .ForMember(x => x.VaccancyDocuments, e => e.MapFrom(mfg => mfg.VaccancyDocuments));

            CreateMap<VacancyDocuments, VacancyDocumentsDto>();

            CreateMap<VacancyList, UpdateVacancyDto>();

            CreateMap<Applicant, ApplicantDetailDto>()
             .ForMember(x => x.ApplicantType, e => e.MapFrom(mfg => mfg.ApplicantType.ToString()))
             .ForMember(x => x.FullName, e => e.MapFrom(mfg => mfg.FirstName + " " + mfg.MiddleName + " " + mfg.LastName))
             .ForMember(x => x.PhoneNumber, e => e.MapFrom(mfg => mfg.PhoneNumber.ToString()))
             .ForMember(x => x.NationalityName, e => e.MapFrom(mfg => mfg.Nationality.CountryName))
             .ForMember(x => x.ZoneName, e => e.MapFrom(mfg => mfg.Zone.ZoneName));

            CreateMap<HrmSetting, HrmSettingDto>()
            .ForMember(x => x.GeneralSetting, e => e.MapFrom(mfg => mfg.GeneralSetting.ToString()));


            CreateMap<HrmSetting, SelectListDto>()
            .ForMember(x => x.Name, e => e.MapFrom(mfg => mfg.GeneralSetting.ToString()));

            CreateMap<ProjectFundSource, ProjectFundSourceGetDto>();
                
            CreateMap<TrainingReport, TrainingReportGetDto>();


            #region Inventory
            CreateMap<Vendor, VendorListDto>()
              .ForMember(a => a.CountryName, e => e.MapFrom(mfg => mfg.Country.CountryName));
            CreateMap<Vendor, SelectListDto>();

            CreateMap<Item, ItemListDto>()
              .ForMember(a => a.CategoryName, e => e.MapFrom(mfg => mfg.Category.Name))
              .ForMember(a => a.MeasurementType, e => e.MapFrom(mfg => mfg.MeasurementType.ToString()))
              .ForMember(a => a.StateType, e => e.MapFrom(mfg => mfg.StateType.ToString()));

            CreateMap<Item, ItemDropDownDto>()
             .ForMember(a => a.MeasurementType, e => e.MapFrom(mfg => (int)mfg.MeasurementType));

            CreateMap<Product, ProductListDto>()
            .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id.ToString()))
            .ForMember(a => a.ItemName, e => e.MapFrom(mfg => mfg.Item.Name))
            .ForMember(a => a.Quantity, e => e.MapFrom(mfg => mfg.Quantiy * mfg.Cartoon * mfg.Packet))
            .ForMember(a => a.MeasurementUnit, e => e.MapFrom(mfg => mfg.MeasurementUnit.Name));

            CreateMap<Product, UpdateProductDto>()
             .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id.ToString()))
             .ForMember(a => a.Quantity, e => e.MapFrom(mfg => mfg.Quantiy));

            CreateMap<Product, AdjustmentDetailDto>()
            .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id.ToString()))
            .ForMember(a => a.ItemName, e => e.MapFrom(mfg => mfg.Item.Name))
            .ForMember(a => a.ItemDetailName, e => e.MapFrom(mfg => mfg.ItemDetailName))
            .ForMember(a => a.RemainingQuantity, e => e.MapFrom(mfg => mfg.RemainingQuantity))
            .ForMember(a => a.MeasurementUnit, e => e.MapFrom(mfg => mfg.MeasurementUnit.Name));

            CreateMap<PurchaseRequestList, SelectListDto>()
                .ForMember(a => a.Name, e => e.MapFrom(mfg => mfg.ItemRequestNo));

            CreateMap<PurchaseRequestList, PurchaseRequestListDto>()
                .ForMember(a => a.ItemName, e => e.MapFrom(mfg => mfg.Item.Name))
                .ForMember(a => a.ItemCode, e => e.MapFrom(mfg => mfg.ItemRequestNo))
                .ForMember(a => a.SinglePrice, e => e.MapFrom(mfg => (double)mfg.SinglePrice))
                .ForMember(a => a.RequesterEmployee, e => e.MapFrom(mfg => $"{mfg.PurchaseRequest.RequesterEmployee.FirstName} {mfg.PurchaseRequest.RequesterEmployee.MiddleName} {mfg.PurchaseRequest.RequesterEmployee.LastName} "))
                .ForMember(a => a.MeasurementUnitName, e => e.MapFrom(mfg => mfg.MeasurementUnit.Name));
          
            #endregion

        }
    }
}
