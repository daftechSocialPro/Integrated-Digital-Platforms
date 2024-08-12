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

        public enum EmployeePaymentType
        {
            PERDAY,
            PERWEEK,
            PERMONTH
        }

        public enum GeneralCodeType
        {
            EMPLOYEEPREFIX,
            ITEM,
            PRODUCT,
            PURCHASEREQUEST,
            STOREREQUEST,
            STOREITEMS,
            VENDOR,
            PURCHASEITEMS,
            TAGNUMBER
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
            LEAVEREQUESTDAYSBEFORE,

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

        public enum TypeOfIndicator
        {
            PERCENT,
            NUMBER,
        }

        public enum TypeStrategicPlanIndicator
        {
            INPUT,
            OUTPUT,
            OUTCOME
        }
        public enum MeasurementType
        {
            LENGTH,
            MASS,
            VOLUME,
            PIECE
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


        public enum CategoryType
        {
            RAW_MATERIAL,
            ASSET,
            OTHER
        }

        public enum StateType
        {
            SOLID,
            LIQUID,
            GAS
        }

        public enum ItemReceivedStatus
        {
            PENDING,
            RECIVED
        }

        public enum AdjustmentReason
        {
            UNKNOWN,
            LOST,
            MAINTAINABLE,
            BROKEN,
            DAMAGED
        }

        public enum SourceOFProduct
        {
            PROJECT,
            ADMIN,
            DONATION,
            OTHER
        }

        public enum ProductStatus
        {
            GOODCONDITION,
            GIVEN,
            LOST,
            DAMAGED,
            MAINTENANCE,
            fIXED,
            RETURNED
        }


        public enum UsedItemsStatus
        {
            GIVEN,
            LOST,
            DAMAGED,
            MAINTAINABLE,
            RETURNED
        }

        public enum LOOKUPCATEGORY
        {
            ACCOUNTING,
            GLOBALSYSTEMLIBRARY,
            VOUCHER
        }

        public enum LOOKOUPTYPE
        {
            ARTICLE,
            BUSSINESS_TYPE,
            COASTING,
            CUSTOMER_STATUS,
            DISTRIBUTION,
            COSTING,

        }

        public enum NORMALBALANCE
        {
            CREDIT,
            DEBT
        }

        public enum ACCOUNTTYPECATEGORY
        {
            OTHER,
            ASSET,
            CAPITAL,
            EQUITY,
            LIABILITY
        }

        public enum ACCOUNTTYPESUBCATEGORY
        {
            ASSET,
            CAPITAL,
            COST_OF_SALES,
            CURRENT_ASSET,
            CURRENT_LIABILITY,
            EQUITY,
            EXPENSES,
            FIXED_ASSET,
            INCOME,
            LIABILITY,
            LONG_TERM_LIABILITY,
            MEDIUM_TERM_LIABILITY,
            OTHER_ASSET
        }

        public enum ACCOUNTINGPERIODTYPE
        {
            TWELVE,
            TWENTYFOUR,
            THIRTYSIX,
            FORTYEIGHT
        }

        public enum CALANDERTYPE
        {
            ETHIOPIAN,
            GREGORIAN
        }


        public enum PaymentType
        {
            TRANSFER,
            CHECK,
            CASH
        }

        public enum TypeOfPayee
        {
            SUPPLIER,
            EMPLOYEE,
            OTHER
        }

        public enum GeneralPSett
        {
            PENSIONEMPLOYEE,
            PENSIONCOMPANY,
            PROVIDENTFUND,
            NORMALOT,
            NIGHTOT,
            DAYOFFOT,
            HOLIDAYOT,

        }

        public enum PayrollReportType
        {
            TRANSPORT_FUEL,
            COMMUNICATION,
            POSITION
        }

        public enum TypeOfCustomer
        {
            Individual,
            Organization
        }

        public enum TaxEntityType
        {
            NoTinTaxpayer,
            VatRegistered,
            TotRegisteredTwoPercent,
            TotRegisteredTenPercent,
            NoneTaxPayer,
            NonTaxable,
        }

        public enum TypeofJV
        {
            Payment,
            JournalVoucher,
            Recivable
        }

        public enum JournalOption
        {
            CasherAccount,
            BankAccount,
            WitholdingAccount,
            VatAccount
        }

       

    }
}
