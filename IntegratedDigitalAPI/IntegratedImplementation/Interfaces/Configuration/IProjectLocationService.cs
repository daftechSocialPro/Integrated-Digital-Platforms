using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IProjectLocationService
    {

        Task<List<ProjectLocationGetDto>> GetProjectLocation();
        Task<ResponseMessage> AddProjectLocation(ProjectLocationPostDto projectLocationPost);
        Task<ResponseMessage> UpdateProjectLocation(ProjectLocationGetDto projectLocationPut);
        Task<ResponseMessage> DeleteProjectLocation(Guid projectLocationId);
    }
}
