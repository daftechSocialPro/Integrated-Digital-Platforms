﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IDepartmentService
    {
        Task<List<DepartmentGetDto>> GetDepartmentList();   
        Task<ResponseMessage> AddDepartment(DepartmentPostDto departmentPost);
        Task<ResponseMessage> UpdateDepartment(DepartmentGetDto departmentUpdate);

    }
}
