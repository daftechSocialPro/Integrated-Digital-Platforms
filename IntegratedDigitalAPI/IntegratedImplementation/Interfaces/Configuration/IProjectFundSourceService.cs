using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IProjectFundSourceService
    {

        Task<List<ProjectFundSourceGetDto>> GetProjectFundSource();
        Task<ResponseMessage> AddProjectFundSource(ProjectFundSourcePostDto projectFundSourcePost);
        Task<ResponseMessage> UpdateProjectFundSource(ProjectFundSourceGetDto projectFundSourcePut);
        Task<ResponseMessage> DeleteProjectFundSource(Guid projectFundSourceId);
    }
}
