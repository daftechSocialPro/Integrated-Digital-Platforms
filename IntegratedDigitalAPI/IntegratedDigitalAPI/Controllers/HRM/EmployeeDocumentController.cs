﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeDocumentController : ControllerBase
    {
        private readonly IEmployeeDocumentService _employeeDocumentService;

        public EmployeeDocumentController(IEmployeeDocumentService employeeDocumentService)
        {
            _employeeDocumentService = employeeDocumentService;
        }

        // Get all employee documents by employee ID
        [HttpGet]
        [ProducesResponseType(typeof(List<EmployeeDocumentsGetDTO>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetDocumentsByEmployeeId(Guid employeeId)
        {
            var employeeDocuments = await _employeeDocumentService.GetEmployeeDocumentById(employeeId);
            if (employeeDocuments == null || !employeeDocuments.Any())
            {
                return NotFound("No Employee Documents Found");
            }

            return Ok(employeeDocuments);
        }

        // Add a new employee document
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddDocument([FromBody] EmployeeDocumentsPostDTO employeeDocument)
        {

            var response = await _employeeDocumentService.Add(employeeDocument);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        // Update an existing employee document
        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateDocument([FromBody] EmployeeDocumentsPostDTO updateEmployeeDocument)
        {

            var response = await _employeeDocumentService.UpdateEmployeeFile(updateEmployeeDocument);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        // Delete an employee document by employee ID and document type ID
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteDocument(Guid employeeDocumentId)
        {
            var response = await _employeeDocumentService.DeleteEmployeeFile(employeeDocumentId);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

    }
}