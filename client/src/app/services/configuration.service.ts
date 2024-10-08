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
import { AddHolidayDto, HolidayListDto } from '../model/configuration/IHolidayDto';
import { IndicatorGetDto, IndicatorPostDto } from '../model/PM/IndicatorsDto';
import { UserService } from './user.service';
import { ProjectLocationGetDto, ProjectLocationPostDto } from '../model/PM/ProjectLocationDto';
import { AddBankDto, BankListDto } from '../model/configuration/IBankListDto';
import { Observable } from 'rxjs';
import { DocumentTypeGetDTO, DocumentTypePostDTO } from '../model/configuration/IDocumentTypeDto';

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

  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  //country 

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

  //Holiday

  getHolidayList() {
    return this.http.get<HolidayListDto[]>(this.baseUrl + "/Holiday/GetHolidayList")
  }

  addHoliday(addHoliday: AddHolidayDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + "/Holiday/AddHoliday", addHoliday)
  }

  updateHoliday(addHoliday: AddHolidayDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/Holiday/UpdateHoliday", addHoliday)
  }

  // indicator

  getUnitOfMeasurment() {
    return this.http.get<IndicatorGetDto[]>(this.baseUrl + "/Indicator")
  }

  addUnitOfMeasurment(unitOfmeasurmentPost: IndicatorPostDto) {

    unitOfmeasurmentPost.createdById = this.userService.getCurrentUser().userId
    return this.http.post<ResponseMessage>(this.baseUrl + "/Indicator", unitOfmeasurmentPost)
  }

  updateUnitOfMeasurment(unitOfmeasurmentGet: IndicatorGetDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/Indicator", unitOfmeasurmentGet)
  }

  getRemainingBudget(projectFundSourceId:string){

    return this.http.get<number>(this.baseUrl+`/ProjectFundSource/GetRemainingBudget?projectFundSourceId=${projectFundSourceId}`)
  }

  //project locations

  getProjectLocations() {
    return this.http.get<ProjectLocationGetDto[]>(this.baseUrl + "/ProjectFundSource")
  }

  addProjectLocation(projectLocation: ProjectLocationPostDto) {
    projectLocation.createdById = this.userService.getCurrentUser().userId
    return this.http.post<ResponseMessage>(this.baseUrl + "/ProjectFundSource", projectLocation)
  }

  updateProjectLocation(projectLocation: ProjectLocationGetDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/ProjectFundSource", projectLocation)
  }
  deleteProjectLocation(locationId:string){
    return this.http.delete<ResponseMessage>(this.baseUrl +`/ProjectFundSource?projectFundSourceId=${locationId}`)
  }

  /// Bank 
  getBankList() {
    return this.http.get<BankListDto[]>(this.baseUrl + "/BankList/GetBankList")
  }

  addBank(addBank: AddBankDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + "/BankList/AddBank", addBank)
  }

  updateBank(updateBank: AddBankDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/BankList/UpdateBank", updateBank)
  }

  // Get all document types (GET request)
  getDocumentTypeList(){
    return this.http.get<DocumentTypeGetDTO[]>(`${this.baseUrl}/DocumentType/Get`);
  }

  getDocumentTypeSelectList(documentCategory: number){
    return this.http.get<SelectList[]>(`${this.baseUrl}/DocumentType/GetDocumentTypeSelectList?documentCategory=${documentCategory}`);
  }
  // Add a new document type (POST request)
  addDocumentType(addDocumentType: DocumentTypePostDTO){
    return this.http.post<ResponseMessage>(`${this.baseUrl}/DocumentType/Add`, addDocumentType);
  }

  // Update an existing document type (PUT request)
  updateDocumentType(updateDocumentType: DocumentTypeGetDTO) {
    return this.http.put<ResponseMessage>(`${this.baseUrl}/DocumentType/Update`, updateDocumentType);
  }
}