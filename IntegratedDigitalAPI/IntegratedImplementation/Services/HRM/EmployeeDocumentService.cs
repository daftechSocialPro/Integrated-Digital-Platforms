using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeeDocumentService : IEmployeeDocumentService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;

        public EmployeeDocumentService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
        }
        public async Task<ResponseMessage> Add(EmployeeDocumentsPostDTO employeeDocumentsPost)
        {
            try
            {
                var person = await _dbContext.Employees.Where(x => x.Id == employeeDocumentsPost.EmployeeId).Select(x => $"{x.FirstName} {x.MiddleName} {x.LastName}").FirstOrDefaultAsync();
                if (person == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Employee Could Not Be Found",

                    };
                }

                var documentType = await _dbContext.DocumentTypes.Where(x => x.Id == employeeDocumentsPost.DocumentTypeId).Select(x => new { x.FileName, x.FileExtentions }).FirstOrDefaultAsync();
                if (documentType == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Employee Doucument Type Could Not Be Found",

                    };
                }

                var exists = await _dbContext.EmployeeDocuments.AnyAsync(x => x.EmployeeId == employeeDocumentsPost.EmployeeId && x.DocumentTypeId == employeeDocumentsPost.DocumentTypeId);
                if (exists)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "A Employee Doucument With The Same Person And Employee Document Type Already Exists",

                    };
                }

                var fileAcceptable = IsAcceptedFileType(employeeDocumentsPost.Document, documentType.FileExtentions);

                if (!fileAcceptable)
                {
                    string fileExtension = Path.GetExtension(employeeDocumentsPost.Document.FileName)?.TrimStart('.').ToUpper();
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = $"The File Type You Submitted ({fileExtension}) Does Not Match The File Type That Is Required For This Document Type ({documentType.FileExtentions})"

                    };
                }

                string nameOfFolder = Path.Combine("Employee", person);

                var result = await _generalConfig.UploadFiles(employeeDocumentsPost.Document, employeeDocumentsPost.Document.FileName, nameOfFolder);
                //if (!result.Success)
                //{
                //    return new ResponseMessage
                //    {
                //        Success = false,
                //        Message = result.Data,
                //         
                //    };
                //}
                var employeeDocuments = new EmployeeDocument
                {

                    Id = Guid.NewGuid(),
                    FilePath = result,
                    DocumentTypeId = employeeDocumentsPost.DocumentTypeId,
                    EmployeeId = employeeDocumentsPost.EmployeeId,
                    CreatedDate = DateTime.Now,
                    CreatedById = employeeDocumentsPost.CreatedById,
                    Rowstatus = employeeDocumentsPost.Rowstatus
                };

                await _dbContext.EmployeeDocuments.AddAsync(employeeDocuments);
                await _dbContext.SaveChangesAsync();





                return new ResponseMessage
                {
                    Success = true,
                    Message = "Employee Document Saved successfully.",
                    Data = employeeDocuments.Id
                };

            }

            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Error Occured While Saving Employee Document"

                };

            }
        }

        public async Task<List<EmployeeDocumentsGetDTO>> GetEmployeeDocumentById(Guid personId)
        {

            List<EmployeeDocumentsGetDTO> employeeDocuments = await _dbContext.EmployeeDocuments

                .Where(x => x.EmployeeId == personId).OrderByDescending(x => x.CreatedDate).Select(x => new EmployeeDocumentsGetDTO
                {
                    Id = x.Id,
                    FilePath = x.FilePath,
                    DocumentTypeName = x.DocumentType.FileName,
                    DocumentTypeCategory = x.DocumentType.DocumentCategory.ToString(),
                    DocumentTypeId = x.DocumentTypeId,
                    EmployeeId = x.EmployeeId,
                    CreatedDate = x.CreatedDate,
                    CreatedById = x.CreatedById,
                    Rowstatus = x.Rowstatus
                }).ToListAsync();



            return employeeDocuments;


        }

        public async Task<ResponseMessage> UpdateEmployeeFile(EmployeeDocumentsPostDTO employeeDocumentsPost)
        {
            try
            {
                var person = await _dbContext.Employees.Where(x => x.Id == employeeDocumentsPost.EmployeeId)
                    .Select(x => $"{x.FirstName} {x.MiddleName} {x.LastName}")
                    .FirstOrDefaultAsync();

                if (person == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Employee Could Not Be Found"
                    };
                }

                var documentType = await _dbContext.DocumentTypes.Where(x => x.Id == employeeDocumentsPost.DocumentTypeId)
                    .Select(x => new { x.FileName, x.FileExtentions })
                    .FirstOrDefaultAsync();

                if (documentType == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Document Type Could Not Be Found"
                    };
                }

                var employeeDocument = await _dbContext.EmployeeDocuments
                    .FirstOrDefaultAsync(x => x.EmployeeId == employeeDocumentsPost.EmployeeId && x.DocumentTypeId == employeeDocumentsPost.DocumentTypeId);

                if (employeeDocument == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Employee Document Not Found"
                    };
                }

                var fileAcceptable = IsAcceptedFileType(employeeDocumentsPost.Document, documentType.FileExtentions);
                if (!fileAcceptable)
                {
                    string fileExtension = Path.GetExtension(employeeDocumentsPost.Document.FileName)?.TrimStart('.').ToUpper();
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = $"The File Type You Submitted ({fileExtension}) Does Not Match The Required File Type ({documentType.FileExtentions})"
                    };
                }

                string nameOfFolder = Path.Combine("Employee", person);

                var result = await _generalConfig.UploadFiles(employeeDocumentsPost.Document, employeeDocumentsPost.Document.FileName, nameOfFolder);
                employeeDocument.FilePath = result;
                employeeDocument.CreatedById = employeeDocumentsPost.CreatedById;
                employeeDocument.Rowstatus = employeeDocumentsPost.Rowstatus;
                employeeDocument.CreatedDate = DateTime.Now;

                _dbContext.EmployeeDocuments.Update(employeeDocument);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Employee Document Updated Successfully",
                    Data = employeeDocument.Id
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Error Occurred While Updating Employee Document"
                };
            }
        }

        public async Task<ResponseMessage> DeleteEmployeeFile(Guid employeeDocumentId)
        {
            try
            {
                var employeeDocument = await _dbContext.EmployeeDocuments
                    .FirstOrDefaultAsync(x => x.Id == employeeDocumentId);

                if (employeeDocument == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Employee Document Not Found"
                    };
                }

                _dbContext.EmployeeDocuments.Remove(employeeDocument);
                await _dbContext.SaveChangesAsync();

                // Optionally: Remove the file from the file system if necessary
                // var result = await _generalConfig.DeleteFile(employeeDocument.FilePath);

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Employee Document Deleted Successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Error Occurred While Deleting Employee Document"
                };
            }
        }



        private static bool IsAcceptedFileType(IFormFile file, FileExtentions selectedExtension)
        {
            if (file == null || file.Length == 0)
            {
                return false;
            }


            string fileExtension = Path.GetExtension(file.FileName)?.TrimStart('.').ToUpper();


            return Enum.GetName(typeof(FileExtentions), selectedExtension).Equals(fileExtension, StringComparison.OrdinalIgnoreCase);
        }


    }

}
