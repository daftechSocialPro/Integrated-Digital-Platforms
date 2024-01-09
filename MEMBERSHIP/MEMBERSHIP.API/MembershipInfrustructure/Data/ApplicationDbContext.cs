using MembershipInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MembershipInfrustructure.Model.Users;
using MembershipInfrustructure.Model.Configuration;

namespace MembershipInfrustructure.Data
{

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        #region configuration

        public DbSet<Country> Countries { get; set; }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Zone> Zones { get; set; }

        public DbSet<EducationalField> EducationalFields { get; set; }

        public DbSet<EducationalLevel> EducationalLevels { get; set; }

        public DbSet<GeneralCodes> GeneralCodes { get; set; }

        public DbSet<MembershipType> MembershipTypes { get; set; }


        #endregion


        #region Users


        public DbSet<Member> Members { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<MemberPayment> MemberPayments { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Announcment> Announcments { get; set; }


        #endregion





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Member>()
               .HasIndex(b => b.PhoneNumber).IsUnique();


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




            modelBuilder.Entity<Member>()
    .Property(m => m.EducationalLevelId)
    .IsRequired(false);

            modelBuilder.Entity<Member>().Property(m => m.ZoneId).IsRequired(false);


        }
    }
}

