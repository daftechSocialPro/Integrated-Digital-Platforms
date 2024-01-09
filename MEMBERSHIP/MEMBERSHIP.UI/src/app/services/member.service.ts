import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseMessage, ResponseMessage2 } from 'src/models/ResponseMessage.Model';
import { IMemberUpdateDto, IMembersGetDto, IMembersPostDto } from 'src/models/auth/membersDto';
import { IMakePayment, IPaymentData } from 'src/models/payment/IPaymentDto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;

  checkIfPhoneNumberExist(phoneNumber: string) {
    return this.http.get<ResponseMessage2>(this.BaseURI + `/Member/CheckIfPhoneNumberExistFromBot?phoneNumber=${phoneNumber}`);
  }

  getMembers() {
    return this.http.get<IMembersGetDto[]>(this.BaseURI + `/Member/GetMmebers`);
  }
  getSingleMember(memberId: string) {
    return this.http.get<IMembersGetDto>(this.BaseURI + `/Member/GetSingleMember?memberId=${memberId}`);
  }
  getSingleMemberPayment(memberId: string) {
    return this.http.get<IMakePayment>(this.BaseURI + `/Member/GetSingleMemberPayment?memberId=${memberId}`);
  }

  completeProfile(profile: FormData) {
    return this.http.post<ResponseMessage>(this.BaseURI + `/Member/CompleteProfile`, profile);
  }
  updateProfile(profile: IMemberUpdateDto) {
    return this.http.put<ResponseMessage>(this.BaseURI + `/Member/UpdateMember`, profile);
  }


  updateProfileFromAdmin(Profile:FormData) {
    return this.http.put<ResponseMessage> (this.BaseURI+ '/Member/UpdateProfileFromAdmin',Profile)
  }

  changeIdCardStatus(memberId: string, status: string,remark:string) {
    return this.http.put<ResponseMessage>(this.BaseURI + `/Member/ChangeIdCardStatus?memberId=${memberId}&status=${status}&remark=${remark}`, {});
  }
  getRequstedIdMembers() {
    return this.http.get<IMembersGetDto[]>(this.BaseURI + `/Member/GetRequstedIdMembers`);
  }

  // report {


  getMembershipReport() {
    return this.http.post(this.BaseURI + `/Member/MembershipReport`,{responseType:'Blob'});
  }


}
