﻿using Microsoft.AspNetCore.Http;

namespace IntegratedImplementation.DTOS.HRM
{
    public class ResignationRequestDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string ReasonForResignation { get; set; } = null!;
        public DateTime ResignationDate { get; set; }
        public IFormFile? ResignationLetterPath { get; set; }
    }

    public class ResignationRequestListDto
    {
        public Guid Id { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string ReasonForResignation { get; set; } = null!;
        public DateTime ResignationDate { get; set; }
        public string ResignationLetterPath { get; set; } = null!;
    }

    public class ApprovedResignationListDto
    {
        public Guid Id { get; set; }
        public string EmployeeName { get; set; } = null!;
        public DateTime? ApprovedDate { get; set; }
        public string ApproverEmployee { get; set; } = null!;
    }
    public class TerminateRequestDto
    {
        public Guid EmployementDetailId { get; set; }
        public string Remark { get; set; }

        public bool BlacListed { get; set; }
        public bool hasSeverance { get; set; }
    }
}
