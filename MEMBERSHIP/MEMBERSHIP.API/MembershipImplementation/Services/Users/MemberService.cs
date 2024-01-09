using AutoMapper;
using AutoMapper.Execution;
using AutoMapper.QueryableExtensions;
using Implementation.DTOS.Authentication;
using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using MembershipImplementation.DataSet;
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
using MembershipInfrustructure.Model.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Reporting.NETCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Reflection;
using System.Text;
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
        public MemberService(ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IAuthenticationService authenticationService,
            IEmailService emailService,
            IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
            _authenticationService = authenticationService;
            _emailService = emailService;
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
                    ZoneId = memberPost.ZoneId,
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
                    ZoneId = memberPost.ZoneId,
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
                     Zone = x.Zone.ZoneName,

                     Woreda = x.Woreda,
                     Inistitute = x.Inistitute

                 }).FirstOrDefaultAsync();
            return members;
        }

        public async Task<List<MembersGetDto>> GetMembers()
        {
            var members = await (from member in _dbContext.Members
                                 join payment in _dbContext.MemberPayments on member.Id equals payment.MemberId into memberPayments
                                 let latestPayment = memberPayments.OrderByDescending(x => x.LastPaid).FirstOrDefault()
                                 select new MembersGetDto
                                 {
                                     Id = member.Id.ToString(),
                                     FullName = member.FullName,
                                     PhoneNumber = member.PhoneNumber,
                                     ImagePath = member.ImagePath,
                                     Email = member.Email,
                                     Zone = member.Zone.ZoneName,
                                     Region = member.Zone.Region.RegionName,
                                     Woreda = member.Woreda,
                                     Inistitute = member.Inistitute,
                                     InstituteRole = member.InstituteRole,
                                     MembershipTypeId = member.MembershipTypeId.ToString(),
                                     MembershipType = member.MembershipType.Name,
                                     MemberId = member.MemberId,
                                     Gender = member.Gender.ToString(),
                                     Amount = latestPayment != null ? latestPayment.Payment : 0.0,
                                     Text_Rn = latestPayment != null ? latestPayment.Text_Rn : "",
                                     ExpiredDate = latestPayment != null ? latestPayment.ExpiredDate : DateTime.Now,
                                     EducationalField = member.EducationalField,
                                     BirthDate = member.BirthDate,
                                     EducationalLevel = member.EducationalLevel.EducationalLevelName,
                                     EducationalLevelId = member.EducationalLevelId.ToString(),
                                     IdCardStatus = member.IdCardStatus.ToString(),
                                     PaymentStatus = latestPayment != null ? latestPayment.PaymentStatus.ToString() : PaymentStatus.PENDING.ToString(),
                                     RejectedRemark = member.RejectedRemark

                                 }).ToListAsync();
            return members;
        }
        public async Task<MembersGetDto> GetSingleMember(Guid MemberId)
        {
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
                                     Zone = member.Zone.ZoneName,
                                     Region = member.Zone.Region.RegionName,
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
                                     ExpiredDate = latestPayment!=null? latestPayment.ExpiredDate:DateTime.Now,
                                     PaymentStatus = latestPayment != null ? latestPayment.PaymentStatus.ToString():null,
                                     Amount = member.MembershipType.Money,
                                     IsBirthDate=member.IsBirthDate



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


                var message = $"Your Membership Id is {member.MemberId} you can login using the provided membership Id ";
                var email = new EmailMetadata
                                    (member.Email, "ID Card Status",
                                        $"Dear {member.FullName},\n\n{message}." +
                                        $"\nThank you.\n\nSincerely,\nEMIA");
                await _emailService.Send(email);


            }
            if (currentPayment != null)
            {
                currentPayment.PaymentStatus = PaymentStatus.PAID;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Payment Completed Successfully" };
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

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMember, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Member" };
        }


        public async Task<ResponseMessage> UpdateProfileFromAdmin(MemberUpdateDto memberUpdate)
        {

            var currentMember = await _dbContext.Members.FirstOrDefaultAsync(x => x.Id == memberUpdate.Id);

            if (currentMember != null)
            {
                currentMember.FullName = memberUpdate.FullName;
                currentMember.PhoneNumber = memberUpdate.PhoneNumber;
                currentMember.Email = memberUpdate.Email;
                currentMember.EducationalField = memberUpdate.EducationalField;
                currentMember.EducationalLevelId = memberUpdate.EducationalLevelId;
                currentMember.Gender = Enum.Parse<Gender>(memberUpdate.Gender);
                currentMember.BirthDate = memberUpdate.BirthDate;
                currentMember.Woreda = memberUpdate.Woreda;
                currentMember.Inistitute = memberUpdate.Institute;
                currentMember.InstituteRole = memberUpdate.InstituteRole;

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
            var members = await (from member in _dbContext.Members.Include(x => x.Zone.Region).Include(x => x.EducationalLevel).Where(x => x.IdCardStatus == IDCARDSTATUS.REQUESTED)
                                 join payment in _dbContext.MemberPayments on member.Id equals payment.MemberId into memberPayments
                                 from payment in memberPayments.DefaultIfEmpty()
                                 select new MembersGetDto
                                 {
                                     Id = member.Id.ToString(),
                                     FullName = member.FullName,
                                     PhoneNumber = member.PhoneNumber,
                                     ImagePath = member.ImagePath,
                                     Email = member.Email,
                                     Zone = member.Zone.ZoneName,
                                     Region = member.Zone.Region.RegionName,
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
                                     RejectedRemark = member.RejectedRemark

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
                        Email = members.Email,
                        Amount = members.MembershipType.Money,
                        MembershipType = members.MembershipType.Name,
                        MembershipTypeId = members.MembershipTypeId.ToString(),
                        Text_Rn = memberPayment.Text_Rn,
                        PaymentStatus = memberPayment.PaymentStatus.ToString(),
                        ExpiredDate = memberPayment.ExpiredDate,
                        MemberId = members.MemberId,
                        Url= memberPayment.Url,
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

        public async Task<byte[]> MembershipTypeReport()
        {
           // MembershipDataSet.CompanyProfileDataTable companyProfileRows = new MembershipDataSet.CompanyProfileDataTable();

            MembershipDataSet.MembersDataTable membersReport = new MembershipDataSet.MembersDataTable();

            var members = await _dbContext.Members.Include(x => x.Zone.Region).Select(member =>
            
                membersReport.AddMembersRow(member.FullName, member.MemberId, member.PhoneNumber, member.MembershipType.Name, member.Zone.Region.RegionName, member.Inistitute, member.Gender.ToString(), "", "")

            ).ToListAsync();

            

            var currentDirectory = Directory.GetCurrentDirectory();
            var reportPath = currentDirectory + "\\wwwroot\\Report\\MembershipReport.rdlc";
            //ReportParameter parameter = new ReportParameter("FromDate", stockReport.FromDate.ToString("dd/MM/yyyy"));
            //ReportParameter totalEmp = new ReportParameter("ToDate", stockReport.ToDate.ToString("dd/MM/yyyy"));
            var localReport = new Microsoft.Reporting.NETCore.LocalReport();
            localReport.ReportPath = reportPath;
            ReportDataSource daata = new ReportDataSource();
            daata.Name = "MemberDataset";
            daata.Value = membersReport;
            localReport.DataSources.Add(daata);       
        

            var bytes = localReport.Render("PDF");
            return bytes;
        }

        public async Task UPdateExpiredDateStatus()
        {
            var todayDate = DateTime.Now;
          
            var memberPayments = await _dbContext.MemberPayments.Where(x => x.ExpiredDate< todayDate.Date && x.PaymentStatus!=PaymentStatus.EXPIRED).ToListAsync();

            foreach(var payment in memberPayments)
            {
                payment.PaymentStatus = PaymentStatus.EXPIRED;
                _dbContext.SaveChangesAsync();

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






        //public async Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee)
        //{
        //    var id = Guid.NewGuid();
        //    var path = "";

        //    if (addEmployee.ImagePath != null)
        //        path = _generalConfig.UploadFiles(addEmployee.ImagePath, id.ToString(), "Employee").Result.ToString();


        //    var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
        //    if (probationPeriod == null)
        //        return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };


        //    var code = await _generalConfig.GenerateCode(GeneralCodeType.EMPLOYEEPREFIX);
        //    addEmployee.EmploymentStatus = EmploymentStatus.ACTIVE.ToString();
        //    EmployeeList employee = new EmployeeList
        //    {
        //        Id = Guid.NewGuid(),
        //        CreatedDate = DateTime.Now,
        //       CreatedById = addEmployee.CreatedById,
        //        EmployeeCode = code,

        //        Email = addEmployee.Email,

        //        EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus),
        //        EmploymentPosition = Enum.Parse<EmploymentPosition>(addEmployee.EmploymentPosition),

        //        FirstName = addEmployee.FirstName,
        //        Address = addEmployee.Address,
        //        LastName = addEmployee.LastName,
        //        BirthDate = addEmployee.BirthDate,
        //        Gender = Enum.Parse<Gender>(addEmployee.Gender),

        //        BankAccountNo = addEmployee.BankAccountNo,
        //        EmploymentDate = addEmployee.EmploymentDate,
        //        ImagePath = path,
        //        PhoneNumber = addEmployee.PhoneNumber,

        //        TinNumber = addEmployee.TinNumber,
        //        Twitter = addEmployee.Twitter,
        //        Facebook = addEmployee.Facebook,
        //        Instagram = addEmployee.Instagram,
        //        Telegram = addEmployee.Telegram,

        //        Rowstatus = RowStatus.ACTIVE,

        //    };
        //    await _dbContext.Employees.AddAsync(employee);
        //    await _dbContext.SaveChangesAsync();



        //    return new ResponseMessage
        //    {

        //        Message = "Added Successfully",
        //        Success = true
        //    };
        //}

        //public async Task<ResponseMessage> UpdateEmployee(EmployeeGetDto addEmployee)
        //{

        //    var path = "";

        //    if (addEmployee.Image != null)
        //        path = _generalConfig.UploadFiles(addEmployee.Image, addEmployee.Id.ToString(), "Employee").Result.ToString();


        //    var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
        //    if (probationPeriod == null)
        //        return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };



        //    addEmployee.EmploymentStatus = EmploymentStatus.ACTIVE.ToString();

        //    var employee = _dbContext.Employees.Find(addEmployee.Id);

        //    if (employee != null)
        //    {

        //        employee.Email = addEmployee.Email;
        //        employee.EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus);
        //        employee.EmploymentPosition = Enum.Parse<EmploymentPosition>(addEmployee.EmploymentPosition);

        //        employee.FirstName = addEmployee.FirstName;
        //        employee.Address = addEmployee.Address;
        //        employee.LastName = addEmployee.LastName;
        //        employee.BirthDate = addEmployee.BirthDate;
        //        employee.Gender = Enum.Parse<Gender>(addEmployee.Gender);

        //        employee.BankAccountNo = addEmployee.BankAccountNo;
        //        employee.EmploymentDate = addEmployee.EmploymentDate;


        //        if (addEmployee.Image!=null)
        //        {
        //            employee.ImagePath = path;
        //        }
        //        employee.PhoneNumber = addEmployee.PhoneNumber;

        //        employee.TinNumber = addEmployee.TinNumber;
        //        employee.Twitter = addEmployee.Twitter;
        //        employee.Facebook = addEmployee.Facebook;
        //        employee.Instagram = addEmployee.Instagram;
        //        employee.Telegram = addEmployee.Telegram;

        //        employee.Rowstatus = RowStatus.ACTIVE;

        //        await _dbContext.SaveChangesAsync();

        //        return new ResponseMessage
        //        {

        //            Message = "Updated Successfully",
        //            Success = true
        //        };

        //    }
        //    else
        //    {
        //        return new ResponseMessage
        //        {

        //            Message = "No employee Found",
        //            Success = false
        //        };
        //    }




        //}

        //public async Task<List<EmployeeGetDto>> GetEmployees()
        //{
        //    var employeeList = await _dbContext.Employees.AsNoTracking()
        //                            .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider)
        //                            .ToListAsync();
        //    return employeeList;
        //}

        //public async Task<EmployeeGetDto> GetEmployee(Guid employeeId)
        //{
        //    var employee = await _dbContext.Employees

        //        .Where(x => x.Id == employeeId)
        //        .AsNoTracking()
        //        .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

        //    return employee;
        //}



        //  public async Task<List<SelectListDto>> GetEmployeeNoUser()
        //  {
        //      var users = _userManager.Users.Select(x => x.EmployeeId).ToList();

        //      var employees = await _dbContext.Employees
        //          .Where(e => !users.Contains(e.Id))
        //          .ProjectTo<SelectListDto>(_mapper.ConfigurationProvider)
        //          .ToListAsync();

        //      return employees;
        //  }


        //public async  Task<List<SelectListDto>> GetEmployeeSelectList()
        //  {

        //      var employees = await _dbContext.Employees.ProjectTo<SelectListDto>(_mapper.ConfigurationProvider).ToListAsync();

        //      return employees;
        //  }



    }
}
