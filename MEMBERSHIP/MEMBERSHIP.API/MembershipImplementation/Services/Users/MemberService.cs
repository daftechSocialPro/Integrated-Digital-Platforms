using AutoMapper;
using AutoMapper.Execution;
using AutoMapper.QueryableExtensions;
using Implementation.DTOS.Authentication;
using Implementation.Helper;
using Implementation.Interfaces.Authentication;

using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.DTOS.HRM;
using MembershipImplementation.DTOS.Payment;
using MembershipImplementation.Helper;
using MembershipImplementation.Interfaces.Configuration;
using MembershipImplementation.Interfaces.HRM;
using MembershipImplementation.Services.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Migrations;
using MembershipInfrustructure.Model.Authentication;
using MembershipInfrustructure.Model.Configuration;
using MembershipInfrustructure.Model.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Reporting.NETCore;
using Microsoft.VisualBasic;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Numerics;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;
using Member = MembershipInfrustructure.Model.Users.Member;

namespace MembershipImplementation.Services.HRM
{
    public class MemberService : IMemberService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IHttpClientFactory _httpClientFactory;
        public MemberService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IAuthenticationService authenticationService,
            IEmailService emailService,
            IHttpClientFactory httpClientFactory,
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
            _authenticationService = authenticationService;
            _emailService = emailService;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<ResponseMessage> RegisterMember(MembersPostDto memberPost)
        {
            try
            {
                Member members = new Member
                {
                    Id = Guid.NewGuid(),
                    FullName = $"{memberPost.FirstName} {memberPost.LastName}",
                    PhoneNumber = memberPost.PhoneNumber,
                    Email = memberPost.Email,
                    RegionId = memberPost.RegionId,
                    Zone = memberPost.Zone,
                    MembershipTypeId = memberPost.MembershipTypeId,
                    Woreda = memberPost.Woreda,
                    Inistitute = memberPost.Inistitute,
                    InstituteRole = memberPost.InistituteRole,
                    EducationalField = memberPost.EducationalField,
                    
                    Rowstatus = RowStatus.ACTIVE,
                    CreatedDate = DateTime.Now,
                };

                if (memberPost.EducationalLevelId != null)
                {
                    members.EducationalLevelId = memberPost.EducationalLevelId;
                }

                var memberType = await _dbContext.MembershipTypes.FindAsync(memberPost.MembershipTypeId);


                await _dbContext.Members.AddAsync(members);
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {
                    Data = new MembersGetDto
                    {
                        Id = members.Id.ToString(),
                        FullName = members.FullName,
                        PhoneNumber = members.PhoneNumber,
                        Email = members.Email,
                        MembershipTypeId = memberPost.MembershipTypeId.ToString(),
                        Woreda = memberPost.Woreda,
                        Inistitute = memberPost.Inistitute,
                        Amount = memberType.Money,
                        Currency = memberType.Currency.ToString()

                    },
                    Message = "Added Successfully",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.Message,
                    Success = false
                };
            }
        }

        public async Task<ResponseMessage> RegisterMemberFromBot(MembersPostDto memberPost)
        {
            try
            {
                Member members = new Member
                {
                    Id = Guid.NewGuid(),
                    FullName = $"{memberPost.FirstName} {memberPost.LastName}",
                    PhoneNumber = memberPost.PhoneNumber,
                    Email = memberPost.Email,
                    RegionId = memberPost.RegionId,
                    Zone = memberPost.Zone,
                    MembershipTypeId = memberPost.MembershipTypeId,
                    Woreda = memberPost.Woreda,
                    Inistitute = memberPost.Inistitute,
                    Rowstatus = RowStatus.ACTIVE,
                    CreatedDate = DateTime.Now,
                };

                var memberType = await _dbContext.MembershipTypes.FindAsync(memberPost.MembershipTypeId);


                await _dbContext.Members.AddAsync(members);
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {
                    Data = new MembersGetDto
                    {
                        Id = members.Id.ToString(),
                        FullName = members.FullName,
                        PhoneNumber = members.PhoneNumber,
                        Email = members.Email,

                        MembershipTypeId = memberPost.MembershipTypeId.ToString(),
                        Woreda = memberPost.Woreda,
                        Inistitute = memberPost.Inistitute,
                        Amount = memberType.Money,


                    },
                    Message = "Added Successfully",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.Message,
                    Success = false
                };
            }
        }


        public async Task<MembersGetDto> CheckPhoneNumberExist(string PhoneNumber)
        {
            var members = await _dbContext.Members.Where(x => x.PhoneNumber == PhoneNumber).Select(x =>
                 new MembersGetDto
                 {
                     Id = x.Id.ToString(),
                     FullName = x.FullName,
                     PhoneNumber = x.PhoneNumber,
                     Email = x.Email,
                     Zone = x.Zone,
                     Woreda = x.Woreda,
                     Inistitute = x.Inistitute

                 }).FirstOrDefaultAsync();
            return members;
        }

        public async Task<List<MembersGetDto>> GetMembers()
        {
            var encryption = "2B7E151628AED2A6ABF7158809CF4F3C";

            // Fetch members with related data
            var members = await _dbContext.Members
                .AsNoTracking()
                .Select(m => new
                {
                    m.Id,
                    m.FullName,
                    m.PhoneNumber,
                    m.RegionId,
                    m.ImagePath,
                    m.Email,
                    m.Zone,
                    RegionName = m.Region.RegionName,
                    m.Woreda,
                    m.Inistitute,
                    m.InstituteRole,
                    m.MembershipTypeId,
                    MembershipTypeName = m.MembershipType.Name,
                    m.MemberId,
                    m.Gender,
                    m.EducationalField,
                    m.BirthDate,
                    EducationalLevelName = m.EducationalLevel.EducationalLevelName,
                    m.EducationalLevelId,
                    m.IdCardStatus,
                    m.RejectedRemark,
                    MembershipCategory = m.MembershipType.MembershipCategory,
                    m.MoodleId,
                    m.MoodlePassword,
                    m.MoodleUserName,
                    m.MoodleStatus,
                    m.CreatedDate
                })
                .ToListAsync();

            // Fetch all payments for each member
            var allMemberPayments = await _dbContext.MemberPayments
                .AsNoTracking()
                .GroupBy(p => p.MemberId)
                .Select(g => new
                {
                    MemberId = g.Key,
                    Payments = g.OrderByDescending(p => p.LastPaid)
                        .Select(p => new
                        {
                            p.Payment,
                            p.Text_Rn,
                            p.ExpiredDate,
                            p.PaymentStatus,
                            p.LastPaid,
                            p.ReceiptImagePath
                            
                        })
                        .ToList()
                })
                .ToDictionaryAsync(x => x.MemberId);

            // Combine the data in memory
            return members.Select(m =>
            {
                allMemberPayments.TryGetValue(m.Id, out var memberPayments);
                var payments = memberPayments?.Payments;
                var latestPayment = payments?.FirstOrDefault();
                var secondLatestPayment = payments?.Skip(1).FirstOrDefault();
                var paymentCount = payments?.Count ?? 0;
                var memberStatus = DetermineMemberStatus(paymentCount, latestPayment?.PaymentStatus, secondLatestPayment?.PaymentStatus);

                return new MembersGetDto
                {
                    Id = m.Id.ToString(),
                    FullName = m.FullName,
                    PhoneNumber = m.PhoneNumber,
                    RegionId = m.RegionId.ToString(),
                    ImagePath = m.ImagePath,
                    Email = m.Email,
                    Zone = m.Zone,
                    Region = m.RegionName,
                    Woreda = m.Woreda,
                    Inistitute = m.Inistitute,
                    InstituteRole = m.InstituteRole,
                    MembershipTypeId = m.MembershipTypeId.ToString(),
                    MembershipType = m.MembershipTypeName,
                    MemberId = m.MemberId,
                    Gender = m.Gender.ToString(),
                    Amount = latestPayment?.Payment ?? 0.0,
                    Text_Rn = latestPayment?.Text_Rn ?? "",
                    ReceiptImage = latestPayment?.ReceiptImagePath??"",
                    ExpiredDate = latestPayment?.ExpiredDate ?? DateTime.Now,
                    EducationalField = m.EducationalField,
                    BirthDate = m.BirthDate,
                    EducationalLevel = m.EducationalLevelName,
                    EducationalLevelId = m.EducationalLevelId.ToString(),
                    IdCardStatus = m.IdCardStatus.ToString(),
                    PaymentStatus = latestPayment?.PaymentStatus.ToString() ?? PaymentStatus.PENDING.ToString(),
                    RejectedRemark = m.RejectedRemark,
                    LastPaid = latestPayment?.LastPaid ?? DateTime.Now,
                    MembershipCategory = m.MembershipCategory.ToString(),
                    MoodleId = m.MoodleId,
                    MoodlePassword = m.MoodlePassword != null ? _generalConfig.Decrypt(m.MoodlePassword, encryption) : "",
                    MoodleName = m.MoodleUserName,
                    MoodleStatus = m.MoodleStatus.ToString(),
                    createdByDate = m.CreatedDate,
                    MemberStatus = memberStatus
                };
            }).ToList();
        }

        public async Task<PaginatedResponseDto<MembersGetDto>> GetMembersPaginated(PaginationRequestDto request)
        {
            var encryption = "2B7E151628AED2A6ABF7158809CF4F3C";

            // Build the base query with filters
            var baseQuery = _dbContext.Members
                .AsNoTracking()
                .Select(m => new
                {
                    m.Id,
                    m.FullName,
                    m.PhoneNumber,
                    m.RegionId,
                    m.ImagePath,
                    m.Email,
                    m.Zone,
                    RegionName = m.Region.RegionName,
                    m.Woreda,
                    m.Inistitute,
                    m.InstituteRole,
                    m.MembershipTypeId,
                    MembershipTypeName = m.MembershipType.Name,
                    m.MemberId,
                    m.Gender,
                    m.EducationalField,
                    m.BirthDate,
                    EducationalLevelName = m.EducationalLevel.EducationalLevelName,
                    m.EducationalLevelId,
                    m.IdCardStatus,
                    m.RejectedRemark,
                    MembershipCategory = m.MembershipType.MembershipCategory,
                    m.MoodleId,
                    m.MoodlePassword,
                    m.MoodleUserName,
                    m.MoodleStatus,
                    m.CreatedDate
                });

            // Apply filters
            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                var searchTerm = request.SearchTerm.ToLower();
                baseQuery = baseQuery.Where(m => 
                    m.FullName.ToLower().Contains(searchTerm) ||
                    m.PhoneNumber.Contains(searchTerm) ||
                    m.MemberId.ToLower().Contains(searchTerm) ||
                    m.Email.ToLower().Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(request.RegionId))
            {
                baseQuery = baseQuery.Where(m => m.RegionId.ToString() == request.RegionId);
            }

            if (!string.IsNullOrEmpty(request.Gender))
            {
                baseQuery = baseQuery.Where(m => m.Gender.ToString() == request.Gender);
            }

            if (!string.IsNullOrEmpty(request.MembershipTypeId))
            {
                baseQuery = baseQuery.Where(m => m.MembershipTypeId.ToString() == request.MembershipTypeId);
            }

            if (request.FromDate.HasValue)
            {
                baseQuery = baseQuery.Where(m => m.CreatedDate >= request.FromDate.Value);
            }

            if (request.ToDate.HasValue)
            {
                baseQuery = baseQuery.Where(m => m.CreatedDate <= request.ToDate.Value);
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(request.SortBy))
            {
                switch (request.SortBy.ToLower())
                {
                    case "fullname":
                        baseQuery = request.SortDirection?.ToLower() == "desc" 
                            ? baseQuery.OrderByDescending(m => m.FullName)
                            : baseQuery.OrderBy(m => m.FullName);
                        break;
                    case "createddate":
                        baseQuery = request.SortDirection?.ToLower() == "desc" 
                            ? baseQuery.OrderByDescending(m => m.CreatedDate)
                            : baseQuery.OrderBy(m => m.CreatedDate);
                        break;
                    case "memberid":
                        baseQuery = request.SortDirection?.ToLower() == "desc" 
                            ? baseQuery.OrderByDescending(m => m.MemberId)
                            : baseQuery.OrderBy(m => m.MemberId);
                        break;
                    default:
                        baseQuery = baseQuery.OrderBy(m => m.FullName);
                        break;
                }
            }
            else
            {
                baseQuery = baseQuery.OrderBy(m => m.FullName);
            }

            // Get total count for pagination
            var totalCount = await baseQuery.CountAsync();

            // Apply pagination
            var members = await baseQuery
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            // Get member IDs for payment lookup
            var memberIds = members.Select(m => m.Id).ToList();

            // Fetch payments for the paginated members only
            var memberPayments = await _dbContext.MemberPayments
                .AsNoTracking()
                .Where(p => memberIds.Contains(p.MemberId))
                .GroupBy(p => p.MemberId)
                .Select(g => new
                {
                    MemberId = g.Key,
                    Payments = g.OrderByDescending(p => p.LastPaid)
                        .Select(p => new
                        {
                            p.Payment,
                            p.Text_Rn,
                            p.ExpiredDate,
                            p.PaymentStatus,
                            p.LastPaid,
                            p.ReceiptImagePath
                        })
                        .ToList()
                })
                .ToDictionaryAsync(x => x.MemberId);

            // Apply payment status filter if specified
            var filteredMembers = members.Where(m =>
            {
                if (string.IsNullOrEmpty(request.PaymentStatus))
                    return true;

                memberPayments.TryGetValue(m.Id, out var memberPayment);
                var latestPayment = memberPayment?.Payments?.FirstOrDefault();
                var paymentStatus = latestPayment?.PaymentStatus.ToString() ?? PaymentStatus.PENDING.ToString();
                
                return paymentStatus == request.PaymentStatus;
            }).ToList();

            // Update total count if payment status filter was applied
            if (!string.IsNullOrEmpty(request.PaymentStatus))
            {
                totalCount = filteredMembers.Count;
            }

            // Combine the data
            var result = filteredMembers.Select(m =>
            {
                memberPayments.TryGetValue(m.Id, out var memberPayment);
                var payments = memberPayment?.Payments;
                var latestPayment = payments?.FirstOrDefault();
                var secondLatestPayment = payments?.Skip(1).FirstOrDefault();
                var paymentCount = payments?.Count ?? 0;
                var memberStatus = DetermineMemberStatus(paymentCount, latestPayment?.PaymentStatus, secondLatestPayment?.PaymentStatus);

                return new MembersGetDto
                {
                    Id = m.Id.ToString(),
                    FullName = m.FullName,
                    PhoneNumber = m.PhoneNumber,
                    RegionId = m.RegionId.ToString(),
                    ImagePath = m.ImagePath,
                    Email = m.Email,
                    Zone = m.Zone,
                    Region = m.RegionName,
                    Woreda = m.Woreda,
                    Inistitute = m.Inistitute,
                    InstituteRole = m.InstituteRole,
                    MembershipTypeId = m.MembershipTypeId.ToString(),
                    MembershipType = m.MembershipTypeName,
                    MemberId = m.MemberId,
                    Gender = m.Gender.ToString(),
                    Amount = latestPayment?.Payment ?? 0.0,
                    Text_Rn = latestPayment?.Text_Rn ?? "",
                    ReceiptImage = latestPayment?.ReceiptImagePath ?? "",
                    ExpiredDate = latestPayment?.ExpiredDate ?? DateTime.Now,
                    EducationalField = m.EducationalField,
                    BirthDate = m.BirthDate,
                    EducationalLevel = m.EducationalLevelName,
                    EducationalLevelId = m.EducationalLevelId.ToString(),
                    IdCardStatus = m.IdCardStatus.ToString(),
                    PaymentStatus = latestPayment?.PaymentStatus.ToString() ?? PaymentStatus.PENDING.ToString(),
                    RejectedRemark = m.RejectedRemark,
                    LastPaid = latestPayment?.LastPaid ?? DateTime.Now,
                    MembershipCategory = m.MembershipCategory.ToString(),
                    MoodleId = m.MoodleId,
                    MoodlePassword = m.MoodlePassword != null ? _generalConfig.Decrypt(m.MoodlePassword, encryption) : "",
                    MoodleName = m.MoodleUserName,
                    MoodleStatus = m.MoodleStatus.ToString(),
                    createdByDate = m.CreatedDate,
                    MemberStatus = memberStatus
                };
            }).ToList();

            return new PaginatedResponseDto<MembersGetDto>
            {
                Data = result,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }

        // Helper method to determine member status
        private string DetermineMemberStatus(int paymentCount, PaymentStatus? latestPaymentStatus, PaymentStatus? secondLatestPaymentStatus)
        {

            if (latestPaymentStatus == PaymentStatus.EXPIRED)
            {
                return "Waiting for Renewal";
            }

            else if (secondLatestPaymentStatus == PaymentStatus.EXPIRED)
            {
                if (latestPaymentStatus == PaymentStatus.PAID)
                {
                    return "Renewed Member";
                }
                else if (latestPaymentStatus == PaymentStatus.PENDING)
                {
                    return "Waiting for Renewal";
                }
                else
                {
                    return "Waiting for Renewal";
                }

            }



            else
            {
                return "New Member";
            }


        }
        public async Task<MembersGetDto> GetSingleMember(Guid MemberId)
        {
            var encryption = "2B7E151628AED2A6ABF7158809CF4F3C";
            var members = await (from member in _dbContext.Members.Where(x => x.Id == MemberId)
                                 join payment in _dbContext.MemberPayments on member.Id equals payment.MemberId into memberPayments
                                 let latestPayment = memberPayments.OrderByDescending(x => x.LastPaid).FirstOrDefault()
                                 select new MembersGetDto
                                 {
                                     Id = member.Id.ToString(),
                                     FullName = member.FullName,
                                     PhoneNumber = member.PhoneNumber,
                                     ImagePath = member.ImagePath,
                                     Email = member.Email,
                                     Zone = member.Zone,
                                     Region = member.Region.RegionName,
                                     Woreda = member.Woreda,
                                     Inistitute = member.Inistitute,
                                     InstituteRole = member.InstituteRole,
                                     MembershipTypeId = member.MembershipTypeId.ToString(),
                                     MembershipType = member.MembershipType.Name,
                                     MemberId = member.MemberId,
                                     Gender = member.Gender.ToString(),
                                     EducationalField = member.EducationalField,
                                     BirthDate = member.BirthDate,
                                     EducationalLevelId = member.EducationalLevelId.ToString(),
                                     IdCardStatus = member.IdCardStatus.ToString(),
                                     RejectedRemark = member.RejectedRemark,
                                     ExpiredDate = latestPayment != null ? latestPayment.ExpiredDate : DateTime.Now,
                                     PaymentStatus = latestPayment != null ? latestPayment.PaymentStatus.ToString() : null,
                                     LastPaid = latestPayment != null ? latestPayment.LastPaid : DateTime.Now,
                                     Text_Rn = latestPayment != null ? latestPayment.Text_Rn : "",
                                     Amount = member.MembershipType.Money,
                                     IsBirthDate = member.IsBirthDate,
                                     MoodleId = member.MoodleId,

                                     MembershipCategory = member.MembershipType.MembershipCategory.ToString(),

                                     MoodlePassword = member.MoodlePassword != null ? _generalConfig.Decrypt(member.MoodlePassword!, encryption) : "",
                                     MoodleName = member.MoodleUserName,
                                     MoodleStatus = member.MoodleStatus.ToString(),
                                     createdByDate = member.CreatedDate,
                                     Currency = member.MembershipType.Currency.ToString(),
                                     ReceiptImage = latestPayment.ReceiptImagePath



                                 }).FirstOrDefaultAsync();




            return members;

        }

        public async Task<MemberPayment> GetSingleMemberPayment(Guid MemberId)
        {
            var memberPayment = await _dbContext.MemberPayments.Where(x => x.MemberId == MemberId).FirstOrDefaultAsync();

            return memberPayment;
        }

        public async Task<ResponseMessage> CompleteProfile(CompleteProfileDto Profile)
        {

            var currentMember = await _dbContext.Members.FirstOrDefaultAsync(x => x.Id == Profile.Id);
            var imagePath = "";

            if (currentMember != null)
            {
                currentMember.EducationalField = Profile.EducationalField;
                currentMember.EducationalLevelId = Guid.Parse(Profile.EducationalLevelId);
                currentMember.InstituteRole = Profile.InstituteRole;
                currentMember.Gender = Enum.Parse<Gender>(Profile.Gender);
                currentMember.IsProfileCompleted = true;
                currentMember.BirthDate = Profile.BirthDate;
                if (Profile.Image != null)
                {
                    imagePath = await _generalConfig.UploadFiles(Profile.Image, currentMember.FullName, "Member");
                    currentMember.ImagePath = imagePath;
                }

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMember, Success = true, Message = "Profile Completed Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Member" };


        }

        public async Task<ResponseMessage> MakePayment(MemberPaymentDto memberPayment)
        {

            var membershipType = await _dbContext.MembershipTypes.FindAsync(memberPayment.MembershipTypeId);
            MemberPayment members = new MemberPayment
            {
                Id = Guid.NewGuid(),
                MemberId = memberPayment.MemberId,
                Url = memberPayment.Url,
                MembershipTypeId = memberPayment.MembershipTypeId,
                ExpiredDate = DateTime.Now.AddYears(membershipType.Years),
                LastPaid = DateTime.Now,
                Text_Rn = memberPayment.Text_Rn,
                Payment = memberPayment.Payment,
                PaymentStatus = PaymentStatus.PENDING
            };
            var memeber = await _dbContext.Members.FindAsync(memberPayment.MemberId);

            memeber.MembershipTypeId = memberPayment.MembershipTypeId;
            await _dbContext.SaveChangesAsync();


            await _dbContext.MemberPayments.AddAsync(members);
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage
            {
                Data = members,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> MakePaymentConfirmation(string txt_rn)
        {
            var currentPayment = await _dbContext.MemberPayments.Where(x => x.Text_Rn == txt_rn).FirstOrDefaultAsync();

            var member = await _dbContext.Members.Where(x => x.Id == currentPayment.MemberId).FirstOrDefaultAsync();
            var memberType = await _dbContext.MembershipTypes.FindAsync(member.MembershipTypeId);
            if (member != null && memberType != null && (member.MemberId == null || member.MemberId == ""))
            {
                var memberID = await _generalConfig.GenerateCode(0, memberType.ShortCode);

                while (_dbContext.Members.Any(x => x.MemberId == memberID))
                {
                    memberID = await _generalConfig.GenerateCode(0, memberType.ShortCode);

                }
                member.MemberId = memberID;
                await _dbContext.SaveChangesAsync();
                AddUSerDto addUser = new AddUSerDto
                {

                    MemberId = member.Id,
                    UserName = member.MemberId,
                    Password = "1234",



                };
                var result = await _authenticationService.AddUser(addUser);


                var message = $"Congratulation, being EMwA Member!!!\n" +
                    $"We have received your payment and would like to thank you for \n being a member of Ethiopian Midwives Association. \n" +
                    $"Your Membership ID is {member.MemberId} you can login through [https://emwamms.org/auth/membership-login/{member.MemberId}] using the provided membership Id.";
                var email = new EmailMetadata
                                    (member.Email, "ID Card Status",
                                        $"{message}" +
                                        $"\nThank you.\n\nSincerely,\nFekadu Mazengia\nExecutive Director");
                await _emailService.Send(email);
                var messageReques = new MessageRequest
                {
                    PhoneNumber = member.PhoneNumber,
                    Message = message
                };
                await _generalConfig.SendMessage(messageReques);

            }
            if (currentPayment != null)
            {
                currentPayment.PaymentStatus = PaymentStatus.PAID;
                currentPayment.IsPaid = true;

                await _dbContext.SaveChangesAsync();




                if (member.MemberId != null && member.MemberId != "")
                {
                    var message = $"Congratulation, your EMwA Membership has been successfully renewed!\n" +
              $"We have received your payment and would like to thank you for continuing to be a valued member of the Ethiopian Midwives Association.\n" +
              $"Your renewed Membership ID is {member.MemberId}, valid until {currentPayment.ExpiredDate.ToString("MMMM dd, yyyy")}. You can log in through [https://emwamms.org/auth/membership-login/{member.MemberId}] using your Membership ID.";

                    var messageReques = new MessageRequest
                    {
                        PhoneNumber = member.PhoneNumber,
                        Message = message
                    };
                    await _generalConfig.SendMessage(messageReques);
                }
                return new ResponseMessage { Success = true, Message = "Payment Completed Successfully", Data = member };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Payment Refernece" };

        }

        public async Task<ResponseMessage> UpdateProfile(MemberUpdateDto memberUpdate)
        {

            var currentMember = await _dbContext.Members.FirstOrDefaultAsync(x => x.Id == memberUpdate.Id);

            if (currentMember != null)
            {
                currentMember.EducationalField = memberUpdate.EducationalField;
                currentMember.EducationalLevelId = memberUpdate.EducationalLevelId;
                currentMember.Gender = Enum.Parse<Gender>(memberUpdate.Gender);
                currentMember.BirthDate = memberUpdate.BirthDate;
                currentMember.Woreda = memberUpdate.Woreda;
                currentMember.Inistitute = memberUpdate.Institute;
                currentMember.InstituteRole = memberUpdate.InstituteRole;
                currentMember.Email = memberUpdate.Email;

                if (memberUpdate.Image != null)
                {
                    var imagePath = await _generalConfig.UploadFiles(memberUpdate.Image, currentMember.FullName, "Member");
                    currentMember.ImagePath = imagePath;
                }


                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMember, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Member" };
        }


        public async Task<ResponseMessage> UpdateProfileFromAdmin(MemberUpdateDto memberUpdate)
        {

            try
            {
                var currentMember = await _dbContext.Members.Include(x => x.MembershipType).FirstOrDefaultAsync(x => x.Id == memberUpdate.Id);

                var isChanged = false;

                if (currentMember != null)
                {
                    currentMember.FullName = memberUpdate.FullName;
                    currentMember.PhoneNumber = memberUpdate.PhoneNumber;
                    if (memberUpdate.RegionId != null)
                    {
                        currentMember.RegionId = Guid.Parse(memberUpdate.RegionId);
                    }

                    currentMember.CreatedDate = memberUpdate.CreatedDate;
                    currentMember.Email = memberUpdate.Email;
                    currentMember.EducationalField = memberUpdate.EducationalField;
                    currentMember.EducationalLevelId = memberUpdate.EducationalLevelId;
                    currentMember.Gender = Enum.Parse<Gender>(memberUpdate.Gender);
                    currentMember.BirthDate = memberUpdate.BirthDate;
                    currentMember.Woreda = memberUpdate.Woreda;
                    currentMember.Inistitute = memberUpdate.Institute;
                    currentMember.InstituteRole = memberUpdate.InstituteRole;
                    if (memberUpdate.MembershipTypeId != null)
                    {
                        if (currentMember.MembershipTypeId != memberUpdate.MembershipTypeId)
                        {
                            isChanged = true;
                        }
                        currentMember.MembershipTypeId = memberUpdate.MembershipTypeId.Value;
                    }

                    if (memberUpdate.Image != null)
                    {
                        var imagePath = await _generalConfig.UploadFiles(memberUpdate.Image, currentMember.FullName, "Member");
                        currentMember.ImagePath = imagePath;
                    }


                    var currentPayments = await _dbContext.MemberPayments.Where(x => x.MemberId == currentMember.Id).OrderByDescending(x => x.LastPaid).ToListAsync();

                    if (currentPayments.Any())
                    {
                        var currentPayment = currentPayments.First();


                        currentPayment.PaymentStatus = Enum.Parse<PaymentStatus>(memberUpdate.PaymentStatus);
                        currentPayment.LastPaid = memberUpdate.LastPaid;
                        currentPayment.ExpiredDate = memberUpdate.ExpiredDate;


                        if (currentPayment.PaymentStatus == PaymentStatus.PAID && (currentMember.MemberId == null || currentMember.MembershipTypeId != null))
                        {
                            currentPayment.IsPaid = true;
                            var mt = await _dbContext.MembershipTypes.FindAsync(currentMember.MembershipTypeId);
                            var memberID = await _generalConfig.GenerateCode(0, mt.ShortCode);

                            while (_dbContext.Members.Any(x => x.MemberId == memberID))
                            {
                                memberID = await _generalConfig.GenerateCode(0, mt.ShortCode);

                            }
                            if ((currentMember.MembershipTypeId != null && isChanged))
                            {
                                var memberUser = await _dbContext.Users.Where(x => x.MemberId == currentMember.Id).ToListAsync();
                                _dbContext.Users.RemoveRange(memberUser);
                                await _dbContext.SaveChangesAsync();
                            }
                            if (isChanged || currentMember.MemberId == null)
                            {
                                currentMember.MemberId = memberID;
                            }

                            
                            if (memberUpdate.ReceiptImage != null)
                            {
                                var imageRRPath = await _generalConfig.UploadFiles(memberUpdate.ReceiptImage, $"{currentMember.FullName}_{currentPayment.Id}", "Member Receipt");
                                currentPayment.ReceiptImagePath = imageRRPath;
                            } 
                            
                            

                            AddUSerDto addUser = new AddUSerDto
                            {

                                MemberId = currentMember.Id,
                                UserName = currentMember.MemberId,
                                Password = "1234",



                            };
                            var result = await _authenticationService.AddUser(addUser);


                            var message = $"Congratulation, being EMwA Member!!!\n" +
                                $"We have received your payment and would like to thank you for \n being a member of Ethiopian Midwives Association. \n" +
                                $"Your Membership ID is {currentMember.MemberId} you can login through [https://emwamms.org/auth/membership-login/{currentMember.MemberId}] using the provided membership Id.";
                            var email = new EmailMetadata
                                                (currentMember.Email, "ID Card Status",
                                                    $"{message}" +
                                                    $"\nThank you.\n\nSincerely,\nFekadu Mazengia\nExecutive Director");


                            var messageReques = new MessageRequest
                            {
                                PhoneNumber = currentMember.PhoneNumber,
                                Message = message
                            };
                            await _generalConfig.SendMessage(messageReques);





                            await _emailService.Send(email);

                        }
                    }
                    else
                    {
                        var currentpay = new MemberPayment
                        {
                            Id = Guid.NewGuid(),
                            PaymentStatus = Enum.Parse<PaymentStatus>(memberUpdate.PaymentStatus),
                            LastPaid = memberUpdate.LastPaid,
                            ExpiredDate = memberUpdate.ExpiredDate,
                            MemberId = currentMember.Id,
                            MembershipTypeId = currentMember.MembershipTypeId,
                            Text_Rn = "tx-emwa_admin_register",
                            Url = ""


                        };
                        if (currentpay.PaymentStatus == PaymentStatus.PAID && (currentMember.MemberId == null || currentMember.MembershipTypeId != null))
                        {

                            var mt = await _dbContext.MembershipTypes.FindAsync(currentMember.MembershipTypeId);
                            var memberID = await _generalConfig.GenerateCode(0, mt.ShortCode);

                            while (_dbContext.Members.Any(x => x.MemberId == memberID))
                            {
                                memberID = await _generalConfig.GenerateCode(0, mt.ShortCode);

                            }
                            if (isChanged || currentMember.MemberId == null)
                            {
                                currentMember.MemberId = memberID;
                            }
                            if (memberUpdate.ReceiptImage != null)
                            {
                                var imageRRPath = await _generalConfig.UploadFiles(memberUpdate.ReceiptImage, $"{currentMember.FullName}_{currentpay.Id}", "Member Receipt");
                                currentpay.ReceiptImagePath = imageRRPath;
                            } 

                            if ((currentMember.MembershipTypeId != null && isChanged) || currentMember.MemberId == null)
                            {
                                var memberUser = await _dbContext.Users.Where(x => x.MemberId == currentMember.Id).ToListAsync();
                                _dbContext.Users.RemoveRange(memberUser);
                                await _dbContext.SaveChangesAsync();
                            }



                            AddUSerDto addUser = new AddUSerDto
                            {

                                MemberId = currentMember.Id,
                                UserName = currentMember.MemberId,
                                Password = "1234",



                            };
                            var result = await _authenticationService.AddUser(addUser);


                            var message = $"Congratulation, being EMwA Member!!!\n" +
                                $"We have received your payment and would like to thank you for \n being a member of Ethiopian Midwives Association. \n" +
                                $"Your Membership ID is {currentMember.MemberId} you can login through [https://emwamms.org/auth/membership-login/{currentMember.MemberId}] using the provided membership Id.";


                            var messageReques = new MessageRequest
                            {
                                PhoneNumber = currentMember.PhoneNumber,
                                Message = message
                            };
                            await _generalConfig.SendMessage(messageReques);


                            var email = new EmailMetadata
                                                (currentMember.Email, "ID Card Status",
                                                    $"{message}" +
                                                    $"\nThank you.\n\nSincerely,\nFekadu Mazengia\nExecutive Director");
                            await _emailService.Send(email);

                        }
                        await _dbContext.MemberPayments.AddAsync(currentpay);
                    }


                    var user = await _userManager.FindByNameAsync(currentMember.MemberId);
                    if (user == null && currentMember.MemberId != null)
                    {
                        AddUSerDto addUser = new AddUSerDto
                        {

                            MemberId = currentMember.Id,
                            UserName = currentMember.MemberId,
                            Password = "1234",



                        };
                        var result = await _authenticationService.AddUser(addUser);


                        var message = $"Congratulation, your EMwA Membership has been successfully renewed!\n" +
              $"We have received your payment and would like to thank you for continuing to be a valued member of the Ethiopian Midwives Association.\n" +
              $"Your renewed Membership ID is {currentMember.MemberId}, valid until {memberUpdate.ExpiredDate.ToString("MMMM dd, yyyy")}. You can log in through https://emwamms.org/auth/membership-login/{currentMember.MemberId} using your Membership ID.";

                        var messageReques = new MessageRequest
                        {
                            PhoneNumber = currentMember.PhoneNumber,
                            Message = message
                        };
                        await _generalConfig.SendMessage(messageReques);


                        // var message = $"Congratulation, being EMwA Member!!!\n" +
                        //     $"We have received your payment and would like to thank you for \n being a member of Ethiopian Midwives Association. \n" +
                        //     $"Your Membership ID is {currentMember.MemberId} you can login through https://emwamms.org using the provided membership Id.";


                        var email = new EmailMetadata
                                            (currentMember.Email, "ID Card Status",
                                                $"{message}" +
                                                $"\nThank you.\n\nSincerely,\nFekadu Mazengia\nExecutive Director");
                        await _emailService.Send(email);
                    }


                    await _dbContext.SaveChangesAsync();



                    return new ResponseMessage { Data = currentMember, Success = true, Message = "Updated Successfully" };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find Member" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }

        public async Task<ResponseMessage> ChangeIdCardStatus(Guid memberId, string status, string? remark)
        {
            var currentMember = await _dbContext.Members.FirstOrDefaultAsync(x => x.Id == memberId);

            if (currentMember != null)
            {

                currentMember.IdCardStatus = Enum.Parse<IDCARDSTATUS>(status);
                currentMember.RejectedRemark = remark;



                if (currentMember.IdCardStatus != IDCARDSTATUS.REQUESTED)
                {
                    var message = "";
                    if (currentMember.IdCardStatus == IDCARDSTATUS.REJECTED)
                    {
                        message = $"The requested Id Card is Rejected due to  {currentMember.RejectedRemark} Please review the reason n request again !!!";
                    }
                    else
                    {
                        message = $"The requested Id Card is Accepted please go to your dashboard http://localhost:4200/"; ;
                    }

                    var email = new EmailMetadata
                                       (currentMember.Email, "ID Card Status",
                                           $"Dear {currentMember.FullName},\n\n{message}." +
                                           $"\nThank you.\n\nSincerely,\nEMIA");
                    await _emailService.Send(email);
                }




                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMember, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Member" };
        }

        public async Task<List<MembersGetDto>> RequstedIdCards()
        {

            var encryption = "2B7E151628AED2A6ABF7158809CF4F3C";
            var members = await (from member in _dbContext.Members.Include(x => x.Region).Include(x => x.EducationalLevel).Where(x => x.IdCardStatus == IDCARDSTATUS.REQUESTED)
                                 join payment in _dbContext.MemberPayments on member.Id equals payment.MemberId into memberPayments
                                 from payment in memberPayments.DefaultIfEmpty()
                                 select new MembersGetDto
                                 {
                                     Id = member.Id.ToString(),
                                     FullName = member.FullName,
                                     PhoneNumber = member.PhoneNumber,
                                     ImagePath = member.ImagePath,
                                     Email = member.Email,
                                     Zone = member.Zone,
                                     Region = member.Region.RegionName,
                                     Woreda = member.Woreda,
                                     Inistitute = member.Inistitute,
                                     InstituteRole = member.InstituteRole,
                                     MembershipTypeId = member.MembershipTypeId.ToString(),
                                     MembershipType = member.MembershipType.Name,
                                     MemberId = member.MemberId,
                                     Gender = member.Gender.ToString(),
                                     Amount = payment != null ? payment.Payment : 0.0,
                                     Text_Rn = payment != null ? payment.Text_Rn : "",
                                     ExpiredDate = payment != null ? payment.ExpiredDate : DateTime.Now,
                                     EducationalField = member.EducationalField,
                                     BirthDate = member.BirthDate,
                                     EducationalLevel = member.EducationalLevel.EducationalLevelName,
                                     EducationalLevelId = member.EducationalLevelId.ToString(),
                                     IdCardStatus = member.IdCardStatus.ToString(),
                                     PaymentStatus = payment != null ? payment.PaymentStatus.ToString() : PaymentStatus.PENDING.ToString(),
                                     RejectedRemark = member.RejectedRemark,

                                     MoodleId = member.MoodleId,
                                     MoodlePassword = member.MoodlePassword != null ? _generalConfig.Decrypt(member.MoodlePassword, encryption) : "",
                                     MoodleName = member.MoodleUserName

                                 }).ToListAsync();

            return members;

        }




        public async Task<ResponseMessage2> CheckIfPhoneNumberExistFromBot(string phoneNumber)
        {




            var members = await _dbContext.Members.Include(x => x.MembershipType).Where(x => x.PhoneNumber == phoneNumber).FirstOrDefaultAsync();

            if (members == null)
            {
                return new ResponseMessage2
                {
                    Exist = false,

                };
            }
            else
            {
                var memberPayment = await _dbContext.MemberPayments.Where(x => x.MemberId == members.Id)
                                            .OrderByDescending(x => x.LastPaid).FirstOrDefaultAsync();


                if (memberPayment == null)
                {

                    MemberTelegramDto member = new MemberTelegramDto
                    {
                        FullName = members.FullName,
                        PhoneNumber = members.PhoneNumber,
                        Amount = members.MembershipType.Money,
                        Currency = members.MembershipType.Currency.ToString(),
                        MembershipType = members.MembershipType.Name,
                        MembershipTypeId = members.MembershipTypeId.ToString(),
                        Text_Rn = null,
                        Email = members.Email,
                        PaymentStatus = null,
                        Url = null,
                        MemberId = members.MemberId,
                        Id = members.Id,


                    };
                    return new ResponseMessage2
                    {
                        Exist = true,
                        Status = "PENDING",
                        Message = $"Membership Type is {members.MembershipType.Name.ToUpper()}, and the Price is {members.MembershipType.Money} ETB. Please Complete the payment!!!",
                        Member = member

                    };

                }
                else
                {

                    MemberTelegramDto member = new MemberTelegramDto
                    {
                        FullName = members.FullName,
                        PhoneNumber = members.PhoneNumber,
                        Currency = members.MembershipType.Currency.ToString(),
                        Email = members.Email,
                        Amount = members.MembershipType.Money,
                        MembershipType = members.MembershipType.Name,
                        MembershipTypeId = members.MembershipTypeId.ToString(),
                        Text_Rn = memberPayment.Text_Rn,
                        PaymentStatus = memberPayment.PaymentStatus.ToString(),
                        ExpiredDate = memberPayment.ExpiredDate,
                        MemberId = members.MemberId,
                        Url = memberPayment.Url,
                        Id = members.Id,


                    };
                    var todayDate = DateTime.Now;
                    var isExpired = memberPayment.ExpiredDate.Date < todayDate.Date;

                    if (isExpired)
                    {
                        return new ResponseMessage2
                        {
                            Exist = true,
                            Status = PaymentStatus.EXPIRED.ToString(),
                            Message = $"Expired on {memberPayment.ExpiredDate}",
                            Member = member

                        };
                    }

                    if (memberPayment.PaymentStatus == PaymentStatus.PAID)
                    {
                        return new ResponseMessage2
                        {
                            Exist = true,
                            Status = PaymentStatus.PAID.ToString(),
                            Message = $"Will Expired on {memberPayment.ExpiredDate}",
                            Member = member

                        };

                    }

                    return new ResponseMessage2
                    {
                        Exist = true,
                        Status = PaymentStatus.PENDING.ToString(),
                        Message = $"Membership Type is {members.MembershipType.Name.ToUpper()}, and the Price is {members.MembershipType.Money} ETB. Please Complete the payment!!!",
                        Member = member

                    };


                }
            }
        }

        public async Task UPdateExpiredDateStatus()
        {
            var todayDate = DateTime.Now;
            var tenDaysFromNow = todayDate.AddDays(10);



            var memberPayments = await _dbContext.MemberPayments.Include(x => x.Member).Where(x => x.ExpiredDate < todayDate.Date && x.PaymentStatus != PaymentStatus.EXPIRED).ToListAsync();

            var memberPayments10days = await _dbContext.MemberPayments.Include(x => x.Member)
    .Where(x => x.ExpiredDate <= tenDaysFromNow && x.PaymentStatus != PaymentStatus.EXPIRED)
    .ToListAsync();

            foreach (var payment in memberPayments)
            {
                payment.PaymentStatus = PaymentStatus.EXPIRED;
                _dbContext.SaveChangesAsync();
                var result = await UpdateMoodleSatus(payment.MemberId, "1");


                var message = $"Dear EMwA Member,\n\n" +
                  $"We would like to inform you that your membership with the Ethiopian Midwives Association will expire on {payment.ExpiredDate.ToString("MMMM dd, yyyy")}.\n\n" +
                  $"Please renew your membership by visiting https://emwamms.org and using your Membership ID: {payment.Member.MemberId}.";



                var messageReques = new MessageRequest
                {
                    PhoneNumber = payment.Member.PhoneNumber,
                    Message = message
                };
                await _generalConfig.SendMessage(messageReques);



            }

            foreach (var payment in memberPayments10days)
            {

                var message = $"Membership Expiration Warning!!!\n" +
                    $"This is a kindly reminder your Membership will expired on {payment.ExpiredDate}. \n" +
                    $"Your Membership ID is {payment.Member.MemberId} you can login through https://emwamms.org and extend your membership .";
                var email = new EmailMetadata
                                    (payment.Member.Email, "Membership Status",
                                        $"{message}" +
                                        $"\nThank you.\n\nSincerely,\nFekadu Mazengia\nExecutive Director");
                await _emailService.Send(email);

            }





        }


        public async Task<ResponseMessage> UpdateMoodleSatus(Guid memberId, string status)
        {

            var member = await _dbContext.Members.FindAsync(memberId);

            if (member != null && member.MoodleId != null)
            {
                try
                {
                    // Create a new HttpClient instance from the factory.
                    HttpClient httpClient = _httpClientFactory.CreateClient();

                    // Define the Moodle API endpoint URL.
                    string apiUrl = "https://emwa-elearning.com/webservice/rest/server.php";

                    // Create a new FormData object and add the required parameters.
                    var formData = new MultipartFormDataContent();
                    formData.Add(new StringContent("json"), "moodlewsrestformat");
                    formData.Add(new StringContent("core_user_update_users"), "wsfunction");
                    formData.Add(new StringContent("a0c0c7896b48813246e45971eaa74c21"), "wstoken");
                    formData.Add(new StringContent(member.MoodleId), "users[0][id]");
                    formData.Add(new StringContent(status), "users[0][suspended]");

                    // Send the POST request to the Moodle API.
                    HttpResponseMessage response = await httpClient.PostAsync(apiUrl, formData);

                    if (response.IsSuccessStatusCode)
                    {
                        // Read the response content as a string.
                        string responseBody = await response.Content.ReadAsStringAsync();

                        member.MoodleStatus = status == "0" ? MoodleStatus.NOTSUSPENDED : MoodleStatus.SUSPENDED;
                        await _dbContext.SaveChangesAsync();

                        // You can process the responseBody as needed.

                        return new ResponseMessage
                        {
                            Success = true,
                            Data = responseBody,
                            Message = "Successfully Updated"

                        };


                    }
                    else
                    {
                        // Handle the case where the Moodle API returns an error.

                        return new ResponseMessage
                        {
                            Success = false,

                            Message = $"{(int)response.StatusCode} API call failed."

                        };

                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions if something goes wrong with the HTTP request.
                    //  return BadRequest("An error occurred: " + ex.Message);
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = ex.Message,
                    };
                }
            }
            else
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Member not Found !!"
                };
            }

        }




        public async Task UpdateBirthDate()
        {
            var todayDate = DateTime.Now;

            var members = await _dbContext.Members.ToListAsync();

            foreach (var member in members)
            {
                if (member.BirthDate.Date == todayDate.Date)
                {
                    member.IsBirthDate = true;

                    var message = $"EMwA Wishes You a Happy Birth Day";
                    var email = new EmailMetadata
                                        (member.Email, "Happy BirthDay",
                                            $"Dear {member.FullName},\n\n{message}." +
                                            $"\nThank you.\n\nSincerely,\nEMIA");
                    await _emailService.Send(email);
                }
                else
                {
                    member.IsBirthDate = false;
                }
                _dbContext.SaveChangesAsync();
            }

        }


        public async Task<ResponseMessage> UpdateMemberMoodle(MoodleDto moodlePost)
        {
            var member = await _dbContext.Members.FindAsync(moodlePost.MemberId);
            if (member != null)
            {
                member.MoodleId = moodlePost.MoodleId;
                member.MoodleUserName = moodlePost.MoodleName;
                var encryption = "2B7E151628AED2A6ABF7158809CF4F3C";

                var password = _generalConfig.Encrypt(moodlePost.MoodlePassword, encryption);
                member.MoodlePassword = password;


                _dbContext.SaveChangesAsync();

                var result = await UpdateMoodleSatus(member.Id, "0");

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Member Moodle Updated Successfully"
                };
            }
            else
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Member Not Found!"
                };
            }


        }

        public async Task<List<MemberRegionRevenueReportDto>> GetRegionRevenueReport()
        {
            // Optimized query using database aggregation instead of loading all data into memory
            var chapters = await _dbContext.Regions
                .Where(x => x.CountryType == CountryType.ETHIOPIAN)
                .AsNoTracking()
                .ToListAsync();

            var membersReports = new List<MemberRegionRevenueReportDto>();

            // Process each region with optimized queries
            foreach (var chapter in chapters)
            {
                // Get revenue for this region using database aggregation
                var regionRevenue = await _dbContext.MemberPayments
                    .AsNoTracking()
                    .Where(x => x.Member.RegionId == chapter.Id && x.PaymentStatus == PaymentStatus.PAID)
                    .Join(_dbContext.MembershipTypes,
                        mp => mp.MembershipTypeId,
                        mt => mt.Id,
                        (mp, mt) => new { mp, mt })
                    .Select(x => x.mt.Money * (x.mt.Currency == Currency.ETB ? 1 : 54))
                    .SumAsync();

                // Get member count for this region
                var memberCount = await _dbContext.Members
                    .AsNoTracking()
                    .CountAsync(x => x.RegionId == chapter.Id);

                var memberReport = new MemberRegionRevenueReportDto
                {
                    RegionName = chapter.RegionName,
                    RegionRevenue = regionRevenue,
                    Members = memberCount
                };

                membersReports.Add(memberReport);
            }

            // Handle foreign members separately with optimized query
            var foreignRevenue = await _dbContext.MemberPayments
                .AsNoTracking()
                .Where(x => (x.Member.RegionId == null || x.Member.RegionId == Guid.Empty) && x.PaymentStatus == PaymentStatus.PAID)
                .Join(_dbContext.MembershipTypes,
                    mp => mp.MembershipTypeId,
                    mt => mt.Id,
                    (mp, mt) => new { mp, mt })
                .Select(x => x.mt.Money * (x.mt.Currency == Currency.ETB ? 1 : 54))
                .SumAsync();

            var foreignMemberCount = await _dbContext.Members
                .AsNoTracking()
                .CountAsync(x => x.RegionId == Guid.Empty || x.RegionId == null);

            var foreignReport = new MemberRegionRevenueReportDto
            {
                RegionName = CountryType.FOREIGN.ToString(),
                RegionRevenue = foreignRevenue,
                Members = foreignMemberCount
            };

            membersReports.Add(foreignReport);
            return membersReports;
        }

        public async Task<ResponseMessage> ImportMemberFormExcel(IFormFile ExcelFile)
        {

            try
            {
                int counter = 0;
                using (var package = new ExcelPackage(ExcelFile.OpenReadStream()))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

                    int rowCount = worksheet.Dimension.Rows;


                    for (int row = 2; row <= rowCount; row++) // Assuming the data starts from the second row
                    {
                        Member member = new Member();
                        var fullName = worksheet.Cells[row, 1].Value?.ToString() ?? string.Empty;
                        var PhoneNumber = worksheet.Cells[row, 2].Value?.ToString() ?? string.Empty;
                        var birthdateExcel = worksheet.Cells[row, 11].Value?.ToString();

                        DateTime birthDate = DateTime.Parse(birthdateExcel);
                        var result = await CheckIfPhoneNumberExistFromBot(PhoneNumber);

                        if (!result.Exist)
                        {

                            var memberID = "";

                            var paymentStatus = worksheet.Cells[row, 13].Value?.ToString().Trim() ?? string.Empty;
                            var gender = worksheet.Cells[row, 8].Value?.ToString().Trim() ?? string.Empty;

                            var memberType = worksheet.Cells[row, 3].Value?.ToString()?.Trim() ?? string.Empty;
                            var selectedMembershipType = await _dbContext.MembershipTypes.Where(x => x.ShortCode == memberType).FirstOrDefaultAsync();

                            if (selectedMembershipType == null)
                            {

                                return new ResponseMessage
                                {
                                    Data = $"Membership type {memberType} is not Found for Member {fullName}!! \n{counter} Members Added Successfully",
                                    Message = "Excel Format Error",
                                    Success = false
                                };

                            }
                            memberID = await _generalConfig.GenerateCode(0, selectedMembershipType.ShortCode);

                            var educationalLevel = worksheet.Cells[row, 6].Value?.ToString() ?? string.Empty;
                            var selectedEducationalLevel = await _dbContext.EducationalLevels.Where(x => x.EducationalLevelName == educationalLevel).FirstOrDefaultAsync();




                            var region = worksheet.Cells[row, 14].Value?.ToString() ?? string.Empty;
                            var selectedRegion = await _dbContext.Regions.Where(x => x.RegionName == region).FirstOrDefaultAsync();


                            member.CreatedDate = DateTime.Now;
                            member.Id = Guid.NewGuid();
                            member.FullName = fullName;
                            member.PhoneNumber = PhoneNumber;
                            member.MembershipTypeId = selectedMembershipType.Id;
                            member.Zone = worksheet.Cells[row, 4].Value?.ToString() ?? string.Empty;
                            member.Woreda = worksheet.Cells[row, 5].Value?.ToString() ?? string.Empty;
                            member.RegionId = selectedRegion != null ? selectedRegion.Id : null;
                            member.EducationalLevelId = selectedEducationalLevel != null ? selectedEducationalLevel.Id : null;
                            member.EducationalField = worksheet.Cells[row, 7].Value?.ToString() ?? string.Empty;
                            member.Gender = gender == "M" ? Gender.MALE : Gender.FEMALE;
                            member.Inistitute = worksheet.Cells[row, 9].Value?.ToString() ?? string.Empty;
                            member.InstituteRole = worksheet.Cells[row, 10].Value?.ToString() ?? string.Empty;
                            member.BirthDate = birthDate;

                            member.MemberId = memberID;

                            await _dbContext.Members.AddAsync(member);
                            await _dbContext.SaveChangesAsync();

                            AddUSerDto addUser = new AddUSerDto
                            {

                                MemberId = member.Id,
                                UserName = member.MemberId,
                                Password = "1234",



                            };
                            var result22 = await _authenticationService.AddUser(addUser);


                            counter += 1;




                        }
                        else
                        {
                            return new ResponseMessage
                            {
                                Data = $"PhoneNumber {PhoneNumber} registerd on Member {fullName} is already Exists !! \n{counter} Members Added Successfully ",
                                Message = "Excel Format Error",
                                Success = false
                            };
                        }






                    }
                }
                return new ResponseMessage
                {
                    Data = $"{counter} Members Added Successfully!",
                    Message = "Add Successfully From Excel!!!",
                    Success = true
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = false
                };
            }


        }

        public async Task<ResponseMessage> DeleteMember(Guid memberId)
        {
            var member = await _dbContext.Members.FindAsync(memberId);

            if (member == null)
            {
                return new ResponseMessage
                {

                    Message = "Member Not Found!!!",
                    Success = false
                };
            }

            var MemberPayments = await _dbContext.MemberPayments.Where(x => x.MemberId == memberId).ToListAsync();


            if (MemberPayments != null)
            {
                _dbContext.MemberPayments.RemoveRange(MemberPayments);
                await _dbContext.SaveChangesAsync();
            }

            if (MemberPayments != null)
            {
                _dbContext.Members.RemoveRange(member);
                await _dbContext.SaveChangesAsync();
            }
            return new ResponseMessage
            {

                Message = "Member Deleted Successfully!!!",
                Success = true
            };

        }

        public async Task<ResponseMessage> UpdateTextReference(string oldTextRn, string newTextRn)
        {

            try
            {
                var memberPayment = await _dbContext.MemberPayments.Where(x => x.Text_Rn == oldTextRn).ToListAsync();
                if (memberPayment.Any())
                {
                    var payment = memberPayment.FirstOrDefault();
                    payment.Text_Rn = newTextRn;

                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Success = true,
                    };


                }

                return new ResponseMessage
                {
                    Success = false,
                    Message = "payment not found"
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };
            }


            throw new NotImplementedException();
        }



        public async Task<ResponseMessage> GetExpiredDate(DateTime lastPaid, Guid membershipTypeId)
        {


            try
            {

                var membershipType = await _dbContext.MembershipTypes.FindAsync(membershipTypeId);

                if (membershipType == null)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Membership type not found."
                    };
                }


                var expiredDate = lastPaid.AddYears(membershipType.Years);



                return new ResponseMessage
                {
                    Success = true,
                    Data = expiredDate
                };




            }
            catch (Exception ex)
            {

                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };
            }

        }

        public async  Task<ResponseMessage> UpdateMemberPayment(MemberPaymentRecieptDto memberUpdate)
        {
            try
            {
                
                var member = await _dbContext.Members.Where(x=> x.Id == memberUpdate.MemberId).FirstOrDefaultAsync();


                if (member == null)
                {
                    return new ResponseMessage()
                    {
                        Success = false,
                        Message = "Member Not Found!!!",

                    };
                }
                
                
               var memberPaymentExist = await _dbContext.MemberPayments.Where(x => x.MemberId == memberUpdate.MemberId).FirstOrDefaultAsync();

               if (memberPaymentExist == null)
               {

                   var membershipType = await _dbContext.MembershipTypes.FindAsync(member.MembershipTypeId);


                   MemberPayment memberPayment = new MemberPayment
                   {
                       Id = Guid.NewGuid(),
                       MemberId = memberUpdate.MemberId,
                       Url = "",
                       MembershipTypeId = member.MembershipTypeId,
                       ExpiredDate = DateTime.Now.AddYears(membershipType.Years),
                       LastPaid = DateTime.Now,
                       Text_Rn = "",
                       Payment = membershipType.Money,
                       PaymentStatus = PaymentStatus.PENDING,



                   };
                   var imageRRPath = await _generalConfig.UploadFiles(memberUpdate.RecieptImage,
                       $"{member.FullName}_{memberPayment.Id}", "Member Receipt");

                   memberPayment.ReceiptImagePath = imageRRPath;


                   await _dbContext.MemberPayments.AddAsync(memberPayment);
                   await _dbContext.SaveChangesAsync();
                   
                   
                   var message = $"Dear {member.FullName},\n\n" +
                                 $"Your payment has been uploaded successfully.\n" +
                                 $"Please wait until the admin approves your payment.\n\n" +
                                 $"Thank you for your patience.\n\nBest regards,\nFekadu Mazengia\nExecutive Director";

                   var smsRequest = new MessageRequest
                   {
                       PhoneNumber = member.PhoneNumber,
                       Message = message
                   };
                   await _generalConfig.SendMessage(smsRequest);

                   
                   return new ResponseMessage
                   {
                       Data = memberPayment,
                       Message = "Receipt uploaded successfully! Please wait for admin approval.",
                       Success = true
                   };
               }
               else
               {
                   var imageRRPath = await _generalConfig.UploadFiles(memberUpdate.RecieptImage,
                       $"{member.FullName}_{memberPaymentExist.Id}", "Member Receipt");

                   memberPaymentExist.ReceiptImagePath = imageRRPath;



                   await _dbContext.SaveChangesAsync();
                   
                   var message = $"Dear {member.FullName},\n\n" +
                                 $"Your payment has been uploaded successfully.\n" +
                                 $"Please wait until the admin approves your payment.\n\n" +
                                 $"Thank you for your patience.\n\nBest regards,\nFekadu Mazengia\nExecutive Director";


                   var smsRequest = new MessageRequest
                   {
                       PhoneNumber = member.PhoneNumber,
                       Message = message
                   };
                   await _generalConfig.SendMessage(smsRequest);

                   
                   
                   return new ResponseMessage
                   {
                       Data = memberPaymentExist,
                       Message = "Receipt uploaded successfully! Please wait for admin approval.",
                       Success = true
                   };
               }
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

       public async Task<ResponseMessage> ForgetMembership(ForgetMembershipRequestDto request)
{
    try
    {
        if (string.IsNullOrEmpty(request.Contact))
        {
            return new ResponseMessage { Success = false, Message = "Please provide an email address or phone number." };
        }

        string contact = request.Contact.Trim();
        Member? member = null;

        // Check if input is email
        if (IsValidEmail(contact))
        {
            member = await _dbContext.Members.FirstOrDefaultAsync(x => x.Email == contact);
        }
        // Check if input is a valid Ethiopian phone number
        else if (IsValidEthiopianPhone(contact))
        {
            member = await _dbContext.Members.FirstOrDefaultAsync(x => x.PhoneNumber == contact);
        }
        else
        {
            return new ResponseMessage { Success = false, Message = "Invalid email or phone number format." };
        }

        // If no member found, return an appropriate response
        if (member == null)
        {
            return new ResponseMessage { Success = false, Message = "No membership record found for the provided contact information." };
        }

        // Prepare the membership ID message
        var message = $"Dear {member.FullName},\n\n" +
                      $"Your Membership ID is **{member.MemberId}**.\n" +
                      $"You can log in at [https://emwamms.org/auth/membership-login/{member.MemberId}] using this ID.\n\n" +
                      $"Thank you for being a valued member.\n\nBest regards,\nFekadu Mazengia\nExecutive Director";

        // Send Email if an email was provided
        if (IsValidEmail(contact))
        {
            var email = new EmailMetadata(member.Email, "Your Membership ID", message);
            await _emailService.Send(email);

            return new ResponseMessage { Success = true, Message = "Your Membership ID has been sent to your email. Please check your inbox." };
        }

        // Send SMS if a phone number was provided
        if (IsValidEthiopianPhone(contact))
        {
            var smsRequest = new MessageRequest
            {
                PhoneNumber = member.PhoneNumber,
                Message = message
            };
            await _generalConfig.SendMessage(smsRequest);

            return new ResponseMessage { Success = true, Message = "Your Membership ID has been sent to your phone via SMS." };
        }

        return new ResponseMessage { Success = false, Message = "Unexpected error occurred. Please try again later." };
    }
    catch (Exception ex)
    {
        return new ResponseMessage { Success = false, Message = "An error occurred while processing your request. Please try again later." };
    }
}

        private bool IsValidEmail(string email)
        {
            var emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, emailPattern);
        }

        private bool IsValidEthiopianPhone(string phone)
        {
            var ethiopianPhonePattern = @"^(\+251|251|0)?(9\d{8})$";
            return Regex.IsMatch(phone, ethiopianPhonePattern);
        }

    }
}
