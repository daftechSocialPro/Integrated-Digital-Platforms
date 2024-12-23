﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
{
    public class DocumentTypeService : IDocumentTypeService
    {
        private readonly ApplicationDbContext _dbContext;


        public DocumentTypeService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> Add(DocumentTypePostDTO driverDocumentTypePost)
        {
            try
            {
                bool exists = await _dbContext.DocumentTypes
                .AsNoTracking()
                .AnyAsync(d => d.FileName == driverDocumentTypePost.FileName &&
                               d.DocumentCategory == driverDocumentTypePost.DocumentCategory);

                if (exists)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "A Document Type with the same FileName and DocumentCategory already exists.",
                        Data = 0
                    };
                }

                DocumentType driverDocumentType = new()
                {
                    FileName = driverDocumentTypePost.FileName,
                    FileExtentions = driverDocumentTypePost.FileExtentions,
                    DocumentCategory = driverDocumentTypePost.DocumentCategory,
                    CreatedById = driverDocumentTypePost.CreatedById,
                    CreatedDate = DateTime.Now,
                    Rowstatus = driverDocumentTypePost.Rowstatus

                };
                await _dbContext.DocumentTypes.AddAsync(driverDocumentType);
                await _dbContext.SaveChangesAsync();



                return new ResponseMessage
                {
                    Success = true,
                    Message = "Document Type Added Successfully !!!",
                    Data = driverDocumentType.Id
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Error Occured While Trying To Add Document Type"
                };
            }
        }

        public async Task<List<DocumentTypeGetDTO>> GetAll()
        {

            List<DocumentTypeGetDTO> selectedBanBodies = await _dbContext.DocumentTypes.

                Select(x => new DocumentTypeGetDTO
                {
                    Id = x.Id,
                    FileName = x.FileName,
                    FileExtentions = x.FileExtentions,
                    DocumentCategory = x.DocumentCategory,
                    FileExtentionsName = x.FileExtentions.ToString(),
                    DocumentCategoryName = x.DocumentCategory.ToString(),
                    CreatedById = x.CreatedById,
                    Rowstatus = x.Rowstatus
                })
                    .ToListAsync();




            return selectedBanBodies;



        }

        public async Task<List<SelectListDto>> GetDocumentTypeSelectList(DocumentCategory documentCategory)
        {
            var documentTypeSelectList = await _dbContext.DocumentTypes.Where(x => x.Rowstatus == RowStatus.ACTIVE && x.DocumentCategory == documentCategory).Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.FileName

            }).ToListAsync();

            return documentTypeSelectList;
        }
        public async Task<ResponseMessage> Update(DocumentTypeGetDTO driverDocumentTypeGet)
        {
            try
            {

                var driverDocumentType = await _dbContext.DocumentTypes.FindAsync(driverDocumentTypeGet.Id);

                if (driverDocumentType == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Document Type was not found."
                    };


                }

                bool exists = await _dbContext.DocumentTypes
                .AsNoTracking()
                .AnyAsync(d => d.Id != driverDocumentTypeGet.Id && d.FileName == driverDocumentTypeGet.FileName &&
                               d.DocumentCategory == driverDocumentTypeGet.DocumentCategory);

                if (exists)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "A Document Type with the same FileName and DocumentCategory already exists.",
                    };
                }

                driverDocumentType.FileName = driverDocumentTypeGet.FileName;
                driverDocumentType.FileExtentions = driverDocumentTypeGet.FileExtentions;
                driverDocumentType.DocumentCategory = driverDocumentTypeGet.DocumentCategory;
                driverDocumentType.Rowstatus = driverDocumentTypeGet.Rowstatus;

                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {
                    Success = true,
                    Message = "Document Type has been updated successfully.",
                    Data = driverDocumentType.Id

                };

            }
            catch (Exception ex)
            {

                return new ResponseMessage
                {
                    Success = false,
                    Message = "Error Occured While Trying To Update Document Type."
                };
            }
        }
    }
}
