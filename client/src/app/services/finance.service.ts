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
  getAccountTypesSelectList(){
    return this.http.get<SelectList[]>(this.BaseURI + "/AccountType/GetAccountTypeSelectList")
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

}
