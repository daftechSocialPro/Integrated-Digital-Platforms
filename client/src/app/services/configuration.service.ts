import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SelectList } from '../model/common';
import { CompanyProfileGetDto, CompanyProfilePostDto } from '../model/configuration/ICompanyProfileDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';

export interface toastPayload {
  message: string;
  title: string;
  ic: IndividualConfig;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  baseUrl: string = environment.baseUrl

  constructor(private toastr: ToastrService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  //country 
  getContriesDropdown() {
    return this.http.get<SelectList[]>(this.baseUrl + "/Country/getCountryDropdown")
  }

  //region

  getRegionsDropdown(countryId: string) {
    return this.http.get<SelectList[]>(this.baseUrl + "/Region/getRegionDropdown?countryId=" + countryId)
  }

  //companyProfile
  getCompanyProfile() {
    return this.http.get<CompanyProfileGetDto>(this.baseUrl + "/CompanyProfile")
  }
  addCompanyProfile(companyProfile: FormData) {
    return this.http.post<ResponseMessage>(this.baseUrl + "/CompanyProfile", companyProfile)
  }
  UpdateCompanyProfile(companyProfile: FormData) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/CompanyProfile", companyProfile)
  }

}