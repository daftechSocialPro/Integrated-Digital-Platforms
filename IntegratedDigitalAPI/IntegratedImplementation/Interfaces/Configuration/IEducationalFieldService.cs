using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IEducationalFieldService
    {

        Task<ResponseMessage> AddEducationalField(EducationalFieldPostDto EducationalFieldPost);
        Task<List<EducationalFieldGetDto>> GetEducationalFieldList();
        Task<ResponseMessage> UpdateEducationalField(EducationalFieldGetDto educationalFieldGet);
    }
}
