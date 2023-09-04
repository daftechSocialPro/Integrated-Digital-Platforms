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

namespace IntegratedImplementation.Datas
{
    public class AutoMapperConfigurations : Profile
    {

        public AutoMapperConfigurations()
        {

            CreateMap<EmployeeList, EmployeeGetDto>()
                .ForMember(a => a.Id, e => e.MapFrom(mfg => mfg.Id))
                .ForMember(a => a.EmployeeName, e => e.MapFrom(mfg => $"{mfg.FirstName} {mfg.MiddleName} {mfg.LastName}"))
                .ForMember(a=> a.RegionName,e=> e.MapFrom(mfg => mfg.Region.RegionName))
                .ForMember(a => a.Nationality, e => e.MapFrom(mfg => mfg.Region.Country.Nationality))
                .ForMember(a => a.DepartmentName, e => e.MapFrom(mfg => mfg.EmployeeDetail.FirstOrDefault(x=>x.Rowstatus == RowStatus.ACTIVE)!.Department.DepartmentName))
                .ForMember(a => a.PostionName, e => e.MapFrom(mfg => mfg.EmployeeDetail.FirstOrDefault(x => x.Rowstatus == RowStatus.ACTIVE)!.Position.PositionName))
                .ForMember(a => a.EmploymentStatus, e => e.MapFrom(mfg => mfg.EmploymentStatus.ToString()));

            CreateMap<EmploymentDetail, EmployeeHistoryDto>()
               .ForMember(a => a.DepartmentName, e => e.MapFrom(mfg => mfg.Department.DepartmentName))
               .ForMember(a => a.PositionName, e => e.MapFrom(mfg => mfg.Position.PositionName));




        }
    }
}
