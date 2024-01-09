import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { ICustomerDto, ICustomerPostDto } from 'src/models/customer-service/ICustomerDto';
import { ResponseMessage } from 'src/models/ResponseMessage.Model';
import { ICustomerGetDto } from 'src/models/customer-service/ICustomerGetDto';

@Injectable({
  providedIn: 'root'
})
export class CssCustomerService {

  constructor(private http: HttpClient, private userService: UserService) { }
  readonly baseUrl = environment.baseUrl;


  //customer
  getCustomer() {
    return this.http.get<ICustomerDto[]>(this.baseUrl + "/Customer/GetCustomeres")
  }
  getCustomerForUpdate(contractNo: string) {
    return this.http.get<ICustomerDto>(this.baseUrl + `/Customer/GetCustomerForUpdate?ContractNo=${contractNo}`)
  }


  addCustomer(addcustomer: ICustomerDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Customer/AddCustomer", addcustomer)
    // /api/Customer/AddCustomer
  }
  getSingleCustomer(contractNo:string) {
    return this.http.get<ICustomerDto>(this.baseUrl + `/Customer/GetSingleCustomer?contractNo=${contractNo}`)
  }

  deleteCustomer(contractNo:string){
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Customer/DeleteCustomer?contractNo=${contractNo}`)
 
  }

  createCustomer (customerPost :ICustomerPostDto){
    return this.http.post<ResponseMessage>(this.baseUrl+"/Customer/CreateBasicData",customerPost)
  }

}
