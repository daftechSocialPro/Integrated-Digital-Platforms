import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AccountTypePostDto } from '../model/Finance/IAccountTypeDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { FinanceLookupPostDto } from '../model/Finance/IFinanceLookupTypeDto';
import { AccountingPeriodGetDto, AccountingPeriodPostDto } from '../model/Finance/IAccountingPeriodDto';
import { ChartOfAccountsGetDto, ChartOfAccountsPostDto, SubsidiaryAccountsPostDto } from '../model/Finance/IChartOfAccountsDto';
import { SelectList } from '../model/common';
import { BenefitPayrollGetDto, BenefitPayrollPostDto, GeneralSettingGetDto, GeneralSettingPostDto, IncomeTaxDto } from '../model/Finance/IPayrollSettingDto';
import { ApprovePaymentDto, PaymentGetDto, PaymentLetterDto, PaymentPostDto } from '../model/Finance/IPaymentDto';
import { CalculatePayrollDto, CheckOrApprovePayrollDto, PayrollGetDto } from '../model/Finance/IPayrollDto';
import { AddBegnningBalanceDto, BeginningBalanceGetDto, BeginningBalancePostDto } from '../model/Finance/IBeginningBalanceDto';
import { PurchaseInvoiceGetDto, PurchaseInvoicePostDto } from '../model/Finance/IPurchaseInvoiceDto';
import { ApprovedLoansDto, LoanPaymentDto } from '../model/Finance/ILoanIssuanceDto';
import { IncomeTaxReportGetDto, PayrollReportGetDto, PensionReportGetDto } from '../model/Finance/IFinanceReportDto';
import { ViewProgressDto } from '../pages/project-managment/view-activties/activityview';
import { AddReceiptDto } from '../model/Finance/IReceiptModel';
import { AccountReconsilationFindDto, AccountToBeReconsiledDto, AddAccountReconsilationDto } from '../model/Finance/IAccountReconsilationDto';
import { AddClientDto, ClientsListDto } from '../model/Finance/IFinanceSettingDto';
import { AddTaxRateDto, TaxRateDto } from '../model/Finance/ITaxRateDto';
import { FinanceDashboardDTO, FinanceBarChartPostDto } from '../model/Finance/IFinanceDashboard';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient, private userService: UserService) { }
  BaseURI: string = environment.baseUrl;

  addAccountType(accountType: AccountTypePostDto) {
    return this.http.post<ResponseMessage>(this.BaseURI + "/AccountType/AddAccountType", accountType)
  }

  updateAccountType(accountType: AccountTypePostDto) {
    return this.http.put<ResponseMessage>(this.BaseURI + "/AccountType/UpdateAccountType", accountType)
  }

  getAccountTypes() {
    return this.http.get<AccountTypePostDto[]>(this.BaseURI + "/AccountType/GetAccountTypes")
  }
    
  addFinanceLookup(addLookup: FinanceLookupPostDto) {
    return this.http.post<ResponseMessage>(this.BaseURI + "/FinanceLookup/AddFinanceLookup", addLookup)
  }

  updateFinanceLookup(updateLookup: FinanceLookupPostDto) {
    return this.http.put<ResponseMessage>(this.BaseURI + "/FinanceLookup/UpdateFinanceLookup", updateLookup)
  }

  getFinanceLookups() {
    return this.http.get<FinanceLookupPostDto[]>(this.BaseURI + "/FinanceLookup/GetFinanceLookups")
  }

  //Accounting Period
  getAccountingPeriod(){
    return this.http.get<AccountingPeriodGetDto[]>(this.BaseURI + "/AccountingPeriod/GetAccountingPeriod")
  }
  addAccountingPeriod(addAccountingPeriod: AccountingPeriodPostDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/AccountingPeriod/AddAccountingPeriod", addAccountingPeriod )
  }
  
  //Chart of Account
  getChatOfAccounts(){
    return this.http.get<ChartOfAccountsGetDto[]>(this.BaseURI + "/ChartOfAccount/GetChartOfAccounts")
  }
  addChartOfAccounts(addChartOfAccounts: ChartOfAccountsPostDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/ChartOfAccount/AddChartOfAccount",addChartOfAccounts)
  }
  updateChartOfAccounts(updateChartOfAccounts: ChartOfAccountsPostDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/ChartOfAccount/UpdateChartOfAccount",updateChartOfAccounts)
  }
  changeChartOfAccountStatus(accountId:string){
    return this.http.put<ResponseMessage>(this.BaseURI + "/ChartOfAccount/ChangeChartOfAccountStatus?accountId="+accountId,{})
  }

  addSubsidiaryAccount(addSubsidiaryAccount: SubsidiaryAccountsPostDto)
  {
    return this.http.post<ResponseMessage>(this.BaseURI + "/ChartOfAccount/AddSubsidiaryAccount",addSubsidiaryAccount)
  }
  updateSubsidiaryAccount(updateSubsidiaryAccount: SubsidiaryAccountsPostDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/ChartOfAccount/UpdateSubsidiaryAccount",updateSubsidiaryAccount)
  }

  changeSubsidiaryAccountStatus(subsidiaryId:string){
    return this.http.put<ResponseMessage>(this.BaseURI + "/ChartOfAccount/ChangeSubsidiaryAccountStatus?subsidiaryId="+subsidiaryId,{})
  }

  //Payroll Settings
    //general Settings
    getGeneralPayrollSettings(){
      return this.http.get<GeneralSettingGetDto[]>(this.BaseURI + "/PayrollSetting/GetGeneralPayrollSettings")
    }

    addGeneralPayrollSetting(generalSetting: GeneralSettingPostDto){
      return this.http.post<ResponseMessage>(this.BaseURI + "/PayrollSetting/SaveGeneralPayrollSetting",generalSetting)
    }

    //Income Tax
    getIncomeTax(){
      return this.http.get<IncomeTaxDto[]>(this.BaseURI + "/PayrollSetting/GetIncomeTax")
    }
    addIncomeTax(incomeTax: IncomeTaxDto){
      return this.http.post<ResponseMessage>( this.BaseURI + "/PayrollSetting/AddIncomeTax",incomeTax)
    }
    updateIncomeTax(incomeTax: IncomeTaxDto){
      return this.http.put<ResponseMessage>( this.BaseURI + "/PayrollSetting/UpdateIncomeTax",incomeTax)
    }

    //Benefit Payroll
    getBenefitPayrolls(){
      return this.http.get<BenefitPayrollGetDto[]>( this.BaseURI + "/PayrollSetting/GetBenefitPayrolls")
    }
    addBenefitPayroll(benefitPayroll: BenefitPayrollPostDto){
      return this.http.post<ResponseMessage>( this.BaseURI + "/PayrollSetting/AddBenefitPayroll",benefitPayroll)
    }

  //Payment
  getPendingPayments(){
    return this.http.get<PaymentGetDto[]>( this.BaseURI +"/Payment/GetPendingPayments")
  }
  getApprovedPayments(){
    return this.http.get<PaymentGetDto[]>( this.BaseURI +"/Payment/GetApprovedPayments")
  }
  getAuthorizedPayments(){
    return this.http.get<PaymentGetDto[]>( this.BaseURI +"/Payment/GetAuthorizedPayments")
  }

  addPayments(paymentData: FormData, ){
    return this.http.post<ResponseMessage>(this.BaseURI + "/Payment/AddPayments",paymentData)
  }
  approvePayment(approvePaymentData: ApprovePaymentDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/Payment/ApprovePayment",approvePaymentData)
  }
  authorizePayment(approvePaymentData: ApprovePaymentDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/Payment/AuthorizePayment",approvePaymentData)
  }
  getPaymentLetter(paymentId: string){
    return this.http.get<PaymentLetterDto>( this.BaseURI + `/Payment/GetPaymentLetter?paymentId=${paymentId}`)
  }

  //Payroll
  getPayrollDataList(){
    return this.http.get<PayrollGetDto[]>(this.BaseURI + "/Payroll/GetPayrollDataList")
  }
  calculatePayroll(calculatePayrollData: CalculatePayrollDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/Payroll/CalculatePayroll",calculatePayrollData)
  }
  checkPayroll(checkPayrollData: CheckOrApprovePayrollDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/Payroll/CheckPayroll",checkPayrollData)
  }
  approvePayroll(approvePayrollData: CheckOrApprovePayrollDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/Payroll/ApprovePayroll",approvePayrollData)
  }

  autorizePayroll(autorizedPayrollData: CheckOrApprovePayrollDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/Payroll/AutorizePayroll",autorizedPayrollData)
  }
  //BeiginningBalance
  getChartsForBegnning(periodId: string){
    return this.http.get<ResponseMessage>(this.BaseURI + "/BegnningBalance/GetChartsForBegnning?PeriodId=" + periodId)
  }

  addBegnningBalance(beginningBalanceData:AddBegnningBalanceDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/BegnningBalance/AddBegnningBalance", beginningBalanceData)
  }

  //PurchaseInvoice
  getPendingPurchaseInvoices(){
    return this.http.get<PurchaseInvoiceGetDto[]>(this.BaseURI + "/PurchaseInvoice/GetPendingPurchaseInvoices")
  }
  getPurchaseInvoices(){
    return this.http.get<PurchaseInvoiceGetDto[]>(this.BaseURI + "/PurchaseInvoice/GetPurchaseInvoices")
  }
  addPurchaseInvoice(purchaseInvoiceData: PurchaseInvoicePostDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/PurchaseInvoice/AddPurchaseInvoice", purchaseInvoiceData)
  }
  approvePurchaseInvoice(purchaseInvoiceId: string, empolyeeId: string){
    return this.http.put<ResponseMessage>(this.BaseURI + "/PurchaseInvoice/ApprovePurchaseInvoice?PurchaseInvoiceId="+ purchaseInvoiceId + "&EmployeeId="+ empolyeeId,{})
  }

  //LoanIssuance
  getApprovedLoans(){
    return this.http.get<ApprovedLoansDto[]>(this.BaseURI + "/LoanIssuance/GetApprovedLoans")
  }
  giveLoan(employeeLoanId: string){
    return this.http.post<ResponseMessage>(this.BaseURI + "/LoanIssuance/GiveLoan?employeeLoanId="+employeeLoanId,{})
  }
  payLoan(payLoanData: LoanPaymentDto){
    return this.http.put<ResponseMessage>(this.BaseURI + "/LoanIssuance/PayLoan",payLoanData)
  }


  //AccountReconsilation
  getAccountToBeReconsiled( addAccountReconsilation: AccountReconsilationFindDto){
    return this.http.post<AccountToBeReconsiledDto>(this.BaseURI + "/AccountReconsilation/GetAccountToBeReconsiled",addAccountReconsilation)
  }

  addAccountReconsilation( searchAccount: AddAccountReconsilationDto){
    return this.http.post<ResponseMessage>(this.BaseURI + "/AccountReconsilation/AddAccountReconsilation",searchAccount)
  }

  //Report
  getPayrollReport(payrollMonth: string){
    return this.http.get<PayrollReportGetDto[]>(this.BaseURI + "/PayrollReport/GetPayrollReport?payrollMonth="+payrollMonth)
  }
  getPensionReport(payrollMonth: string){
    return this.http.get<PensionReportGetDto>(this.BaseURI + "/PayrollReport/GetPensionReport?payrollMonth="+payrollMonth)
  }
  getIncomeTaxReport(payrollMonth: string){
    return this.http.get<IncomeTaxReportGetDto>(this.BaseURI + "/PayrollReport/GetIncomeTaxReport?payrollMonth="+payrollMonth)
  }
  viewFinanceProgress(empId: string) {

    return this.http.get<ViewProgressDto[]>(this.BaseURI + "/Receipt/ViewProgress?employeeId=" + empId)
}

//recipet 
addRecipet(paymentData: AddReceiptDto, ){
  return this.http.post<ResponseMessage>(this.BaseURI + "/Receipt/AddReceipt",paymentData)
}

//ClientLists
    
addClient(addClient: AddClientDto) {
  return this.http.post<ResponseMessage>(this.BaseURI + "/Client/AddClient", addClient)
}

updateClient(updateClient: AddClientDto) {
  return this.http.put<ResponseMessage>(this.BaseURI + "/Client/UpdateClient", updateClient)
}

getclientList() {
  return this.http.get<ClientsListDto[]>(this.BaseURI + "/Client/GetClientList")
}

//Tax Rate
getTaxRate() {
  return this.http.get<TaxRateDto[]>(this.BaseURI + "/TaxRate/GetTaxRate")
}
  
addTaxRate(addRate: AddTaxRateDto) {
  return this.http.post<ResponseMessage>(this.BaseURI + "/TaxRate/AddTaxRate", addRate)
}

//dashboard
getDashboardData(){
  return this.http.get<FinanceDashboardDTO>(this.BaseURI + "/FinanceDashboard/GetDashboardData")
}

getDashboardChart(planId : string){
  return this.http.get<FinanceBarChartPostDto>(this.BaseURI + "/FinanceDashboard/GetDashboardChart?planId=" + planId)
}
}
