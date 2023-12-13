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
            PERFORMANCE
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
            ANNUALLEAVEREQESTMONTH,
            LEAVEREQUESTDAYSBEFORE
        }

        public enum PerformanceStatus
        {
            PENDING,
            ONPROGRESS,
            FINALIZED,
        }

        public enum LeavePlanSettingStatus
        {
            REQUESTED,
            REJECTED,
            APPROVED
        }

        public enum TypeOfLoan
        {
            ADVANCE,
            LOAN,
            OTHER
        }



        public enum LoanStatus
        {
            REJECTED,
            PENDING,
            APPROVED,
            GIVEN,
            PAID
        }

        public enum MeasurmentType
        {
            PERCENT,
            NUMBER
        }

        public enum ActivityType
        {
            BOTH,
            OFFICE_WORK,
            FIELD_WORK
        }
        public enum Status
        {
            ASSIGNED,
            STARTED,
            FINALIZED,
            ONPROGRESS,
            TERMINATED
        }

        public enum ProgressStatus
        {
            SIMPLEPROGRESS,
            FINALIZE
        }

        public enum ApprovalStatus
        {
            PENDING,
            APPROVED,
            REJECTED
        }

        public enum TargetDivision
        {
            QUARTERLY,
            MONTHLY
        }

        public enum ProjectTeamEmployeeStatus
        {
            NOMINATED,
            APPROVED,
            REJECTED
        }

        public enum WarningType
        {
            ORAL,
            LETTER
        }

        public enum ReportingType
        {
            FROMACTIVITYENDDATE,
            FROMQUARTEENDDATE

        }

        public enum ReportStatus
        {
            NOTSENT,
            SENT,
            DRAFTED,
            SUBMITTED
        }

        public enum TraineeListStatus
        {
            NOTSENT,
            SENT,
            SUBMITTED
        }
        public enum TypeOfBenefit
        {
            PERCENTILE,
            NUMBER,
        }

        public enum PenaltyType
        {
            ABSENT,
            LATE,
            OTHER
        }

    }
}
