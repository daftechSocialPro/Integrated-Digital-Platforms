import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "../user.service";
import { IGeneralOptionsDto } from "src/models/system-control/IGeneralOptionsDto";
import { ResponseMessage } from "src/models/ResponseMessage.Model";
import { IAccountPeriodDto } from "src/models/system-control/IAccountPeriod";

@Injectable({
  providedIn: 'root'
})
export class ScsSetupService {
  constructor(private http: HttpClient, private userService: UserService) { }
  readonly baseUrl = environment.baseUrl;

  getGeneralOptions() {
    return this.http.get<IGeneralOptionsDto>(this.baseUrl + "/GeneralOptions/GetGeneralOptions")
  }

  //Account Period
  getAccountPeriod() {
    return this.http.get<IAccountPeriodDto>(this.baseUrl + "/AccountPeriod/GetAccountPeriod")
  }


  updateAccountPeriod(updateAccountPeriod: IAccountPeriodDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/AccountPeriod/UpdateAccountPeriod", updateAccountPeriod)
  }


  backUpDatabase (dbName:String ,path:string){
    return this.http.post<ResponseMessage>(this.baseUrl + `/DataBaseBackUp/BackUp?dbName=${dbName}&path=${path}`, {})
  
    
  }

  getBillTemplates (imageName :string){
    return  this.http.get<any>(this.baseUrl+`/BillTemplates/GetBillTemplates?imageName=${imageName}`)
  }

  getBackUpPath(){

    return this.http.get<ResponseMessage>(this.baseUrl+`/DataBaseBackUp/GetDatabaseBakcupPath`)
  }
}  