﻿using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface IMembershipTypeService
    {

        Task<ResponseMessage> AddMembershipType(MembershipTypePostDto MembershipTypePost);
        Task<List<MembershipTypeGetDto>> GetMembershipTypeList();
        Task<ResponseMessage> UpdateMembershipType(MembershipTypeGetDto MembershipTypePost);

        Task<ResponseMessage> DeleteMembershipType(Guid MembershipTypeId);
    }
}
