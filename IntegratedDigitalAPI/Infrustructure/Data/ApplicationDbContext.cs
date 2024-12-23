﻿using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.FInance.Actions;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Model.Training;
using IntegratedInfrustructure.Model.Vacancy;
using IntegratedInfrustructure.Models.Common;
using IntegratedInfrustructure.Models.Inventory;
using IntegratedInfrustructure.Models.PM;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Activity = IntegratedInfrustructure.Models.PM.Activity;

namespace IntegratedInfrustructure.Data
{


    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {

        public DbSet<RoleCategory> RoleCategories { get; set; }


        #region configuration

        public DbSet<CompanyProfile> CompanyProfiles { get; set; }
        public DbSet<GeneralCodes> GeneralCodes { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<EducationalLevel> EducationalLevels { get; set; }
        public DbSet<EducationalField> EducationalFields { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<HolidayLst> Holidays { get; set; }
        public DbSet<ProjectFundSource> ProjectFundSources { get; set; }
        public DbSet<Project_Fund> Project_Funds { get; set; }

        public DbSet<Indicator> Indicators { get; set; }


        public DbSet<BankList> BankLists { get; set; }

        public DbSet<DocumentType> DocumentTypes { get; set; }
        #endregion

        #region HRM
        public DbSet<Department> Departments { get; set; }
        public DbSet<EmployeeEducation> EmployeeEducations { get; set; }
        public DbSet<EmployeeFamily> EmployeeFamilies { get; set; }
        public DbSet<EmployeeLeave> EmployeeLeaves { get; set; }
        public DbSet<EmployeeList> Employees { get; set; }
        public DbSet<EmployeeWorkExperiance> EmployeeWorkExperiances { get; set; }
        public DbSet<EmploymentDetail> EmploymentDetails { get; set; }
        public DbSet<ContractExtentionEmployee> ContractExtentionEmployees { get; set; }
        public DbSet<EmployeeSurety> EmployeeSureties { get; set; }
        public DbSet<LeavePlanSetting> LeavePlanSetting { get; set; }
        public DbSet<EmployeeSalary> EmployeeSalaries { get; set; }
        public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
        public DbSet<LeaveBalance> LeaveBalances { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<HrmSetting> HrmSettings { get; set; }
        public DbSet<ResignationRequest> ResignationRequests { get; set; }
        public DbSet<EmployeeSupervisors> EmployeeSupervisors { get; set; }
        public DbSet<PerformanceSetting> PerformanceSettings { get; set; }
        public DbSet<PerformanceScale> PerformanceScales { get; set; }
        public DbSet<PerformancePlan> PerformancePlans { get; set; }
 
        public DbSet<EmployeePerformance> EmployeePerformances { get; set; }
        public DbSet<EmployeePerformanceDetail> EmployeePerformanceDetails { get; set; }
        public DbSet<EmployeeDevelopmentPlan> EmployeeDevelopmentPlans { get; set; }
        public DbSet<OnFieldEmployeeList> onFieldEmployeeLists { get; set; }
        public DbSet<LoanSetting> LoanSettings { get; set; }
        public DbSet<LoanRequest> LoanRequests { get; set; }
        public DbSet<EmployeeLoan> EmployeeLoans { get; set; }
        public DbSet<EmployeeSettlement> EmployeeSettlements { get; set; }
        public DbSet<EmployeeDisciplinaryCase> EmployeeDisciplinaryCases { get; set; }
        public DbSet<Volunter> Volunters { get; set; }
        public DbSet<BenefitList> BenefitLists { get; set; }
        public DbSet<EmployeeBenefits> EmployeeBenefits { get; set; }
        public DbSet<EmployeeFingerPrint> EmployeeFingerPrints { get; set; }
        public DbSet<DeviceSetting> DeviceSettings { get; set; }
        public DbSet<AttendanceLogFile> AttendanceLogFiles { get; set; }
        public DbSet<EmployeeAttendance> EmployeeAttendances { get; set; }
        public DbSet<OverTime> OverTimes { get; set; }
        public DbSet<ShiftList> ShiftLists { get; set; }
        public DbSet<ShiftDetail> ShiftDetails { get; set; }
        public DbSet<EmployeeShift> EmployeeShifts { get; set; }
        public DbSet<EmployeePenalty> EmployeePenalty { get; set; }
        public DbSet<LeaveTypeDetails> LeaveTypeDetails { get; set; }
        public DbSet<EmployeeBank> EmployeeBanks { get; set; }
        public DbSet<EmployeeGuarantiee> EmployeeGuarantiees { get; set; }
        public DbSet<EmployeeSeverance> EmployeeSeverances { get; set; }

        #endregion

        #region Vacancy
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<ApplicantVacancy> ApplicantVacancies { get; set; }
        public DbSet<ApplcantDocuments> ApplcantDocuments { get; set; }
        public DbSet<ApplicantEducation> ApplicantEducations { get; set; }
        public DbSet<ApplicantWorkExperiance> ApplicantWorkExperiances { get; set; }
        public DbSet<VacancyList> VacancyLists { get; set; }
        public DbSet<VacancyDocuments> VacancyDocuments { get; set; }
        public DbSet<VacancyStatus> VacancyStatuses { get; set; }
        #endregion

        #region PM
        public DbSet<ReportingPeriod> ReportingPeriods { get; set; }
        public DbSet<BudgetYear> BudgetYears { get; set; }



        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityParent> ActivitiesParents { get; set; }

        public DbSet<ActivityProgress> ActivityProgresses { get; set; }
        public DbSet<ActivityTargetDivision> ActivityTargetDivisions { get; set; }
        public DbSet<ActivityTerminationHistories> ActivityTerminationHistories { get; set; }
        public DbSet<EmployeesAssignedForActivities> EmployeesAssignedForActivities { get; set; }
        public DbSet<ProgressAttachment> ProgressAttachments { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTeamEmployees> ProjectTeamEmployees { get; set; }
        public DbSet<ProjectTeam> ProjectTeams { get; set; }
        public DbSet<QuarterSetting> QuarterSettings { get; set; }
        public DbSet<StrategicPlan> StrategicPlans { get; set; }
        public DbSet<TaskMembers> TaskMembers { get; set; }
        public DbSet<TaskMemo> TaskMemos { get; set; }
        public DbSet<TaskMemoReply> TaskMemoReply { get; set; }
        public DbSet<Tasks> Tasks { get; set; }

        public DbSet<ActivityLocation> ActivityLocations { get; set; }
        #endregion

        #region Training
        public DbSet<Training> Trainings { get; set; }

        public DbSet<Trainee> Trainees { get; set; }

        public DbSet<TraineesPicture> TraineesPictures { get; set; }
        public DbSet<Trainers> Trainers { get; set; }
        public DbSet<TrainingReport> TrainingReports { get; set; }

        public DbSet<WeeklyReport> WeeklyReports { get; set; }

        public DbSet<TrainingReportAttachment> TrainingReportAttachments { get; set; }


        #endregion 

        #region Inventory
        public DbSet<Category> Categories { get; set; }
        public DbSet<MeasurmentUnit> MeasurmentUnits { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<PurchaseRequest> PurchaseRequests { get; set; }
        public DbSet<PurchaseRequestList> PurchaseRequestLists { get; set; }
        public DbSet<StoreRequest> StoreRequests { get; set; }
        public DbSet<StoreRequestList> StoreRequestLists { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorBankAccounts> VendorBankAccounts { get; set; }
        public DbSet<AdjustmentHistory> AdjustmentHistories { get; set; }
        public DbSet<ItemReceival> ItemReceivals { get; set; }
        public DbSet<ItemReceivalDetail> ItemReceivalDetails { get; set; }
        public DbSet<MaintainableItems> MaintainableItems { get; set; }
        public DbSet<PerformaDetail> PerformaDetails { get; set; }
        public DbSet<ProductTag> ProductTags { get; set; }
        public DbSet<ItemRecivalTags> ItemRecivalTags { get; set; }
        #endregion



        #region Finacne

        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<FinanceLookup> FinanceLookups { get; set; }
        public DbSet<ChartOfAccount> ChartOfAccounts { get; set; }
        public DbSet<SubsidiaryAccount> SubsidiaryAccounts { get; set; }
        public DbSet<AccountingPeriod> AccountingPeriods { get; set; }
        public DbSet<PeriodDetails> PeriodDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
        public DbSet<TaxEntityRate> TaxEntityRates { get; set; }
        public DbSet<GeneralPayrollSetting> GeneralPayrollSettings { get; set; }
        public DbSet<IncomeTaxSetting> IncomeTaxSettings { get; set; }
        public DbSet<PayrollData> PayrollDatas { get; set; }
        public DbSet<EmployeePayroll> EmployeePayrolls { get; set; }
        public DbSet<BenefitPayroll> BenefitPayrolls { get; set; }
        public DbSet<BegningBalance> BegningBalances { get; set; }
        public DbSet<BegningBalanceDetail> BegningBalanceDetails { get; set; }
        public DbSet<PurchaseInvoice> PurchaseInvoices { get; set; }
        public DbSet<PurchaseInvoiceDetail> PurchaseInvoiceDetails { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<ReceiptDetail> ReceiptDetails { get; set; }
        public DbSet<AccountReconciliation> AccountReconciliations { get; set; }
        public DbSet<Clients> Clients { get; set; }
        public DbSet<JournalVoucher> JournalVouchers { get; set; }
        public DbSet<JournalVoucherDetail> JournalVoucherDetails { get; set; }
        public DbSet<LedgerPostingAccount> LedgerPostingAccounts { get; set; }
        public DbSet<PaymetRequisitions> PaymetRequisitions { get; set; }
        public DbSet<EmployeePaymentSettlement> EmployeePaymentSettlements { get; set; }
        public DbSet<PayeeDetailesPayment> PayeeDetailesPayments { get; set; }
        #endregion



        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.NoAction;

            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            });
            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.HasKey(r => new { r.UserId, r.RoleId });
            });
            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            });

            modelBuilder.Entity<GeneralCodes>()
               .HasIndex(b => b.GeneralCodeType).IsUnique();
            modelBuilder.Entity<Country>().HasIndex(b => b.CountryName).IsUnique();
            modelBuilder.Entity<EducationalField>().HasIndex(b => b.EducationalFieldName).IsUnique();
            modelBuilder.Entity<EducationalLevel>().HasIndex(b => b.EducationalLevelName).IsUnique();
            modelBuilder.Entity<Region>().HasIndex(b => b.RegionName).IsUnique();
            modelBuilder.Entity<Zone>().HasIndex(b => b.ZoneName).IsUnique();
            modelBuilder.Entity<Applicant>().HasIndex(b => b.Email).IsUnique();
            modelBuilder.Entity<Position>().HasIndex(b => b.PositionName).IsUnique();
            modelBuilder.Entity<Department>().HasIndex(b => b.DepartmentName).IsUnique();
            modelBuilder.Entity<LeaveType>().HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<BankList>().HasIndex(b => b.BankName).IsUnique();
            modelBuilder.Entity<BenefitList>().HasIndex(b => b.Name).IsUnique();
            modelBuilder.Entity<EmployeeBenefits>().HasIndex(b => new { b.BenefitId, b.EmployeeId }).IsUnique();




        }
    }
}
