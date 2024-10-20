﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DocumentTypeController : ControllerBase
    {
        private readonly IDocumentTypeService _documentTypeService;

        public DocumentTypeController(IDocumentTypeService documentTypeService)
        {
            _documentTypeService = documentTypeService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(DocumentTypeGetDTO), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get()
        {
            return Ok(await _documentTypeService.GetAll());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetDocumentTypeSelectList(DocumentCategory documentCategory)
        {
            return Ok(await _documentTypeService.GetDocumentTypeSelectList(documentCategory));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Add([FromBody] DocumentTypePostDTO addDocumentType)
        {

            return Ok(await _documentTypeService.Add(addDocumentType));

        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update([FromBody] DocumentTypeGetDTO updateDocumentType)
        {

            return Ok(await _documentTypeService.Update(updateDocumentType));

        }

    }
}
