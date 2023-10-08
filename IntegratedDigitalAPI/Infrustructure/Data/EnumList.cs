using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Data
{
    public class EnumList
    {

        public enum UserType
        {
            ADMIN,
            USER,
        }
        public enum RowStatus
        {
            ACTIVE,
            INACTIVE
        }

        public enum Gender
        {
            MALE,
            FEMALE
        }

        public enum MaritalStatus
        {
            SINGLE,
            MARRIED,
            DIVORCE,
            WIDOW
        }


        public enum EmploymentType
        {
            PERMANENT,
            CONTRAT,
            TEMPORARY
        }
        public enum SALARYSOURCE
        {
            PROJECT,
            OTHER
        }

        public enum EmploymentStatus
        {
            ACTIVE,
            TERMINATED,
            RESIGNED
        }

        public enum PaymentType
        {
            PERDAY,
            PERWEEK,
            PERMONTH
        }

        public enum GeneralCodeType
        {
            EMPLOYEEPREFIX
        }

        public enum ApplicantStatus
        {
            PENDING,
            APPLIED,
            EXAM,
            INTERVIEW,
            REJECTED,
            HIRED,
            BLACKLISTED
        }

        public enum VacancyType
        {
            INTERNAL,
            EXTERNAL,
            BOTH
        }

        public enum ApplicantType
        {
            INTERNAL,
            EXTERNAL
        }

        public enum LeaveCategory
        {
            ANNUAL,
            UNPAID,
            OTHER
        }
        public enum LeaveRequestStatus
        {
            PENDING,
            APPROVED,
            REJECTED
        }

        public enum FamilyRelation
        {
           PARENT,
           SPOUSE,
           CHILD
        }
        public enum GeneralHrmSetting
        {
            PROBATIONPERIOD,
            ANNUALLEAVESTARTMONTH,
            NUMBEROFDAYOFFS,
            RESIGNATIONREQUESTDAYS,
            ANNUALLEAVEREQESTMONTH
        }

        public enum PerformanceStatus
        {
            PENDING,
            ONPROGRESS,
            FINALIZED,
        }

        public enum TypeOfLoan
        {
            ADVANCE,
            LOAN,
            OTHER
        }

        public enum LoanStatus
        {
            PENDING,
            APPROVED,
            GIVEN,
        }

    }
}
