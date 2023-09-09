import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { GeneralCodeDto, SelectList } from '../model/common';
import { CompanyProfileGetDto, CompanyProfilePostDto } from '../model/configuration/ICompanyProfileDto';
import { CountryGetDto, CountryPostDto, RegionGetDto, RegionPostDto, ZoneGetDto, ZonePostDto } from '../model/configuration/IAddressDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { EducationalFieldGetDto, EducationalFieldPostDto, EducationalLevelGetDto, EducationalLevelPostDto } from '../model/configuration/ICommonDto';

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
  //zone 
  getZonesDropdown(regionId: string) {
    return this.http.get<SelectList[]>(this.baseUrl + "/Zone/getZoneDropdown?regionId=" + regionId)
  }
  getZones() {

    return this.http.get<ZoneGetDto[]>(this.baseUrl + "/Zone")
  }

  addZone(ZonePostDto: ZonePostDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Zone", ZonePostDto)
  }
  updateZone(ZonePostDto: ZonePostDto) {

    return this.http.put<ResponseMessage>(this.baseUrl + "/Zone", ZonePostDto)
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

  //educational fields 

  getEducationaslFields() {

    return this.http.get<EducationalFieldGetDto[]>(this.baseUrl + "/EducationalField")
  }

  addEducationalField(EducationalFieldPostDto: EducationalFieldPostDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/EducationalField", EducationalFieldPostDto)
  }
  updateEducationalField(EducationalFieldPostDto: EducationalFieldGetDto) {

    return this.http.put<ResponseMessage>(this.baseUrl + "/EducationalField", EducationalFieldPostDto)
  }

  // educational level
  getEducationaslLevels() {

    return this.http.get<EducationalLevelGetDto[]>(this.baseUrl + "/EducationalLevel")
  }

  addEducationalLevel(EducationalLevelPostDto: EducationalLevelPostDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/EducationalLevel", EducationalLevelPostDto)
  }
  updateEducationalLevel(EducationalLevelPostDto: EducationalLevelGetDto) {

    return this.http.put<ResponseMessage>(this.baseUrl + "/EducationalLevel", EducationalLevelPostDto)
  }

  // generalcode s

  getGeneralCodes() {

    return this.http.get<GeneralCodeDto[]>(this.baseUrl + "/GeneralCodes")
  }

}