using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Vacancy
{
    public interface IVacancyService
    {
        Task<List<VacancyListDto>> GetVacancyList();
        Task<UpdateVacancyDto> GetVacancyEdit(Guid vacancyId);
        Task<ResponseMessage> AddVacancy(AddVacancyDto addVacancy);
        Task<ResponseMessage> UpdateVacancy(UpdateVacancyDto updateVacancy);
        Task<VacancyListDto> GetVacancyDetail(Guid vacancyId);
        Task<List<VacancyDocumentsDto>> GetVacancyDocuments(Guid vacancyId);
        Task<ResponseMessage> ApproveVacancy(Guid vacancyId);
        Task<ResponseMessage> AddVacancyDocument(AddVacancyDocumentDto addVacancyDocument);
    }
}
