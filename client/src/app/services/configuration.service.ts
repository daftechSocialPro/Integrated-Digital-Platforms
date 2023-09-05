import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SelectList } from '../model/common';
import { CompanyProfileGetDto, CompanyProfilePostDto } from '../model/configuration/ICompanyProfileDto';
import { CountryGetDto, CountryPostDto, RegionGetDto, RegionPostDto } from '../model/configuration/IcountryDto';
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
  getCountries() {

    return this.http.get<CountryGetDto[]>(this.baseUrl + "/Country")
  }

  addCountry(countryPostDto: CountryPostDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Country", countryPostDto)
  }
  updateCountry(countryPostDto: CountryGetDto) {

    return this.http.put<ResponseMessage>(this.baseUrl + "/Country", countryPostDto)
  }

  //region

  getRegionsDropdown(countryId: string) {
    return this.http.get<SelectList[]>(this.baseUrl + "/Region/getRegionDropdown?countryId=" + countryId)
  }
  getRegions() {

    return this.http.get<RegionGetDto[]>(this.baseUrl + "/Region")
  }

  addRegion(RegionPostDto: RegionPostDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Region", RegionPostDto)
  }
  updateRegion(RegionPostDto: RegionGetDto) {

    return this.http.put<ResponseMessage>(this.baseUrl + "/Region", RegionPostDto)
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