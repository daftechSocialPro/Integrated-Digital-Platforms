using Implementation.Helper;
using IntegratedImplementation.DTOS.Vacancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Vacancy
{
    public interface IApplicantService
    {
        Task<List<ApplicantListDto>> GetApplicantList(Guid vacancyId);
        Task<ResponseMessage> AddInternalApplicant(InternalApplicantDto internalApplicantDto);
        Task<ResponseMessage> AddEducationLevel(ApplicantEducationDto applicantEducation);
        Task<ResponseMessage> AddWorkExperience(ApplicantWorkExperienceDto applicantWorkExperience);
        Task<ResponseMessage> ApplyForVanacncy(ApplyVacancyDto applyVacancy);
        Task<ResponseMessage> AddApplicantDocument(ApplicantVacancyDocumentDto applicantVacancy);
        Task<ResponseMessage> FinalizeApplication(Guid applicantId, Guid vacancyId);

        Task<ApplicantDetailDto> GetApplicantDetail(Guid applicantId);
        Task<List<ApplicantEducationListDto>> GetApplicantEducation(Guid applicantId);
        Task<List<ApplicantWorkExperienceListDto>> GetApplicantExperience(Guid applicantId);
        Task<List<ApplicantVacancyList>> GetApplicantVacancies(Guid applicantId);
        Task<List<ApplicantVacancyDocumentListDto>> GetApplicantDocument(Guid applicantVacancyId);

    }
}
