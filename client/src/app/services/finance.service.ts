import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AccountTypePostDto } from '../model/Finance/IAccountTypeDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { FinanceLookupPostDto } from '../model/Finance/IFinanceLookupTypeDto';

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
  
}
