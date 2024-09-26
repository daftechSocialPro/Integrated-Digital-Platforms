import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
import { ResponseMessage } from 'src/models/ResponseMessage.Model';
import { IAnnouncmentGetDto, IAnnouncmentPostDto } from 'src/models/configuration/IAnnouncmentDto';
import { IGeneralCodeDto } from 'src/models/configuration/ICommonDto';
import { ICourseGetDto } from 'src/models/configuration/ICourseDto';
import {
  IEducationalFieldGetDto,
  IEducationalFieldPostDto,
  IEducationalLevelGetDto,
  IEducationalLevelPostDto
} from 'src/models/configuration/IEducationDto';
import {
  ICountryGetDto,
  ICountryPostDto,
  IRegionGetDto,
  IRegionPostDto,
  IZoneGetDto,
  IZonePostDto
} from 'src/models/configuration/ILocatoinDto';
import { IMembershipTypeGetDto, IMembershipTypePostDto } from 'src/models/configuration/IMembershipDto';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  baseUrl: string = environment.baseUrl;
  baseUrlPdf: string = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  //country
  getCountries() {
    return this.http.get<ICountryGetDto[]>(this.baseUrl + '/Country');
  }
  addCountry(fromData: ICountryPostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/Country', fromData);
  }

  updateCountry(fromData: ICountryPostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/Country', fromData);
  }
  deleteCountry(countryId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Country?countryId=${countryId}`);
  }
  //region

  getRegions() {
    return this.http.get<IRegionGetDto[]>(this.baseUrl + '/Region');
  }
  addRegion(fromData: IRegionPostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/Region', fromData);
  }

  updateRegion(fromData: IRegionPostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/Region', fromData);
  }
  deleteRegion(RegionId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Region?RegionId=${RegionId}`);
  }

  //zone
  getZones() {
    return this.http.get<IZoneGetDto[]>(this.baseUrl + '/Zone');
  }
  addZone(fromData: IZonePostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/Zone', fromData);
  }

  updateZone(fromData: IZonePostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/Zone', fromData);
  }
  deleteZone(Zone: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Zone?Zone=${Zone}`);
  }
  //
  getEducationaslFields() {
    return this.http.get<IEducationalFieldGetDto[]>(this.baseUrl + '/EducationalField');
  }

  addEducationalField(EducationalFieldPostDto: IEducationalFieldPostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/EducationalField', EducationalFieldPostDto);
  }
  updateEducationalField(EducationalFieldPostDto: IEducationalFieldPostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/EducationalField', EducationalFieldPostDto);
  }
  deleteEducationalField(educationalFieldId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/EducationalField?educationalFieldId=${educationalFieldId}`);
  }
  // educational level
  getEducationaslLevels() {
    return this.http.get<IEducationalLevelGetDto[]>(this.baseUrl + '/EducationalLevel');
  }

  addEducationalLevel(EducationalLevelPostDto: IEducationalLevelPostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/EducationalLevel', EducationalLevelPostDto);
  }
  updateEducationalLevel(EducationalLevelPostDto: IEducationalLevelPostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/EducationalLevel', EducationalLevelPostDto);
  }
  deleteEducationalLevel(educationalLevelId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/EducationalLevel?educationalLevelId=${educationalLevelId}`);
  }

  // membership types

  getMembershipTYpes() {
    return this.http.get<IMembershipTypeGetDto[]>(this.baseUrl + '/MembershipType/GetMembershipTypeList');
  }
  addMembershipType(fromData: IMembershipTypePostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/MembershipType/AddMembershipType', fromData);
  }

  updateMembershipType(fromData: IMembershipTypePostDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/MembershipType/UpdateMembershipType', fromData);
  }
  deleteMembershipType(MembershipTypeId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/MembershipType/DeleteMembershipType?MembershipTypeId=${MembershipTypeId}`);
  }
  // generalcode s

  getGeneralCodes() {
    return this.http.get<IGeneralCodeDto[]>(this.baseUrl + '/GeneralCodes');
  }

  getCourses(membershipTypeId: string) {
    return this.http.get<ICourseGetDto[]>(this.baseUrl + `/Course/GetCourseList?membershipTypeId=${membershipTypeId}`);
  }
  addCourse(fromData: FormData) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/Course/AddCourse', fromData);
  }

  updateCourse(fromData: FormData) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/Course/UpdateCourse', fromData);
  }
  deleteCourse(CourseId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Course/DeleteCourse?CourseId=${CourseId}`);
  }
  getMemberEvents(memberId:string){
    return this.http.get<ICourseGetDto[]>(this.baseUrl + `/Course/GetMemberEvents?memberId=${memberId}`);
  
  }

  getSingleEvent (eventId : string ){

    return this.http.get<ICourseGetDto>(this.baseUrl+`/Course/GetSingleEvent?eventId=${eventId}`)
  }

  //announcment

  getAnnouncment() {
    return this.http.get<IAnnouncmentGetDto[]>(this.baseUrl + '/Announcment/GetAnnouncmentList');
  }
  addAnnouncment(fromData: FormData) {
    return this.http.post<ResponseMessage>(this.baseUrl + '/Announcment/AddAnnouncment', fromData);
  }

  updateAnnouncment(fromData: FormData) {
    return this.http.put<ResponseMessage>(this.baseUrl + '/Announcment/UpdateAnnouncment', fromData);
  }
  deleteAnnouncment(AnnouncmentId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Announcment/DeleteAnnouncment?AnnouncmentId=${AnnouncmentId}`);
  }
}
