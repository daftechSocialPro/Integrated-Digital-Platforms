using IntegratedInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Vacancy;


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
        #endregion

        #region HRM

        public DbSet<Department> Departments { get; set; }
        public DbSet<EmployeeEducation> EmployeeEducations { get; set; }
        public DbSet<EmployeeFamily> EmployeeFamilies { get; set; }
        public DbSet<EmployeeLeave> EmployeeLeaves { get; set; }
        public DbSet<EmployeeList> Employees { get; set; }
        public DbSet<EmployeeWorkExperiance> EmployeeWorkExperiances { get; set; }
        public DbSet <EmploymentDetail> EmploymentDetails { get; set; }
        public DbSet<EmployeeDocuments> EmployeeDocuments { get; set; }
        public DbSet<LeaveBalance> LeaveBalances { get; set; }
        public DbSet<LeaveType> LeaveTypes { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<HrmSetting> HrmSettings { get; set; }
        public DbSet<ResignationRequest> ResignationRequests { get; set; }

        #endregion

        #region Vacancy
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<ApplicantVacancy> ApplicantVacancies { get; set; }
        public DbSet<ApplcantDocuments> ApplcantDocuments { get; set; }
        public DbSet<ApplicantEducation> ApplicantEducations { get; set; }
        public DbSet<ApplicantWorkExperiance> ApplicantWorkExperiances { get; set; }
        public DbSet<VacancyList> VacancyLists { get; set; }
        public DbSet<VacancyDocuments> VacancyDocuments { get; set; }
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
            modelBuilder.Entity<Country>().HasIndex(b=>b.CountryName).IsUnique();
            modelBuilder.Entity<Country>().HasIndex(b=>b.Nationality).IsUnique();
            modelBuilder.Entity<EducationalField>().HasIndex(b=>b.EducationalFieldName).IsUnique();
            modelBuilder.Entity<EducationalLevel>().HasIndex(b=>b.EducationalLevelName).IsUnique();
            modelBuilder.Entity<Region>().HasIndex(b=>b.RegionName).IsUnique();
            modelBuilder.Entity<Zone>().HasIndex(b => b.ZoneName).IsUnique();
            modelBuilder.Entity<Applicant>().HasIndex(b => b.Email).IsUnique();
            modelBuilder.Entity<Position>().HasIndex(b => b.PositionName).IsUnique();
            modelBuilder.Entity<Department>().HasIndex(b => b.DepartmentName).IsUnique();
            modelBuilder.Entity<LeaveType>().HasIndex(b => b.Name).IsUnique();




        }
    }
}
