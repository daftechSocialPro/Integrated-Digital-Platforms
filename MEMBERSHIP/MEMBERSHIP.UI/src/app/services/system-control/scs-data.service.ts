import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEmployeeGetDto } from 'src/models/hrm/IEmployeeDto';
import { IMeterSizeDto } from 'src/models/system-control/IMeterSizeDto';
import { UserService } from '../user.service';
import { ResponseMessage } from 'src/models/ResponseMessage.Model';

import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { IConsumptionLevelDto } from 'src/models/system-control/IConsumptionLevelDto';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';
import { IConsumptionTariffDto } from 'src/models/system-control/IConsumptionTariffDto';
import { IKetenaDto } from 'src/models/system-control/IKetenaDto';
import { IKebelesDto } from 'src/models/system-control/IKebelesDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';
import { IGeneralInterfceDto } from 'src/models/system-control/IGeneralInterfaceDto';
import { IPenalityRateDto } from 'src/models/system-control/IPenalityRateDto';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';

@Injectable({
  providedIn: 'root'
})
export class ScsDataService {
  constructor(private http: HttpClient, private userService: UserService) { }
  readonly baseUrl = environment.baseUrl;



  //customer category 
  getCustomerCategory() {
    return this.http.get<ICustomerCategoryDto[]>(this.baseUrl + "/CustomerCategory/GetCustomerCategory")
  }
  addCustomerCategory(addCustomerCategory: ICustomerCategoryDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/CustomerCategory/AddCustomerCategory", addCustomerCategory)
  }
  updateCustomerCategory(updateCustomerCategory: ICustomerCategoryDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/CustomerCategory/UpdateCustomerCategory", updateCustomerCategory)
  }

  deleteCustomerCategory(CustomerCategoryId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/CustomerCategory/DeleteCustomerCategory?CustomerCategoryId=${CustomerCategoryId}`)
  }
  //customer category 
  getConsumptionLevel() {
    return this.http.get<IConsumptionLevelDto[]>(this.baseUrl + "/ConsumptionLevel/GetConsumptionLevel")
  }
  addConsumptionLevel(addConsumptionLevel: IConsumptionLevelDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/ConsumptionLevel/AddConsumptionLevel", addConsumptionLevel)
  }
  updateConsumptionLevel(updateConsumptionLevel: IConsumptionLevelDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/ConsumptionLevel/UpdateConsumptionLevel", updateConsumptionLevel)
  }

  deleteConsumptionLevel(ConsumptionLevelId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/ConsumptionLevel/DeleteConsumptionLevel?ConsumptionLevelId=${ConsumptionLevelId}`)
  }
  //meter-size

  getMeterSize() {
    return this.http.get<IMeterSizeDto[]>(this.baseUrl + "/MeterSize/GetMeterSize")
  }
  addMeterSize(addMeterSize: IMeterSizeDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/MeterSize/AddMeterSize", addMeterSize)
  }
  updateMeterSize(updateMeterSize: IMeterSizeDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/MeterSize/UpdateMeterSize", updateMeterSize)
  }

  deleteMeterSize(meterSizeId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/MeterSize/DeleteMeterSize?meterSizeId=${meterSizeId}`)

  }
  //general setting 

  getGeneralSetting(settingCategory: string) {

    return this.http.get<IGeneralSettingDto[]>(this.baseUrl + `/GeneralSetting/GetGeneralSetting?settingCategory=${settingCategory}`)
  }
  addGeneralSetting(addGeneralSetting: IGeneralSettingDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/GeneralSetting/AddGeneralSetting", addGeneralSetting)
  }
  updateGeneralSetting(updateGeneralSetting: IGeneralSettingDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/GeneralSetting/UpdateGeneralSetting", updateGeneralSetting)
  }

  deleteGeneralSetting(GeneralSettingId: string) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/GeneralSetting/DeleteGeneralSetting?GeneralSettingId=${GeneralSettingId}`)

  }
  //meter rent 
  getMeterSizeRents() {
    return this.http.get<IMeterSizeRentDto[]>(this.baseUrl + `/MeterSizeRent/GetMeterSizeRents`)
  }

  getMeterSizeRentForUpdate(recordNo: number) {
    return this.http.get<IMeterSizeRentDto>(this.baseUrl + `/MeterSizeRent/GetMeterSizeRentForUpdate?recordNo=${recordNo}`)
  }


  addMetersizeRent(addMeterSizeRent: IMeterSizeRentDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/MeterSizeRent/AddMeterSizeRent", addMeterSizeRent)
  }


  updateMetersizeRent(updateMeterSizeRent: IMeterSizeRentDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/MeterSizeRent/UpdateMeterSizeRent", updateMeterSizeRent)
    // /api/MeterSizeRent/UpdateMeterSizeRent
  }

  deleteMetersizeRent(meterRentId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/MeterSizeRent/DeleteMeterSizeRent?MeterSizeRentId=${meterRentId}`)

  }
  //consumption Tariff

  getConsumptionTariffs() {
    return this.http.get<IConsumptionTariffDto[]>(this.baseUrl + `/ConsumptionTariff/GetConsumptionTariffs`)
  }

  getConsumptionTariffForUpdate(recordNo: number) {
    return this.http.get<IConsumptionTariffDto>(this.baseUrl + `/ConsumptionTariff/GetConsumptionTariffForUpdate?recordNo=${recordNo}`)
  }


  addConsumptionTariff(addConsumptionTariff: IConsumptionTariffDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/ConsumptionTariff/AddConsumptionTariff", addConsumptionTariff)
  }


  updateConsumptionTariff(updateConsumptionTariff: IConsumptionTariffDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/ConsumptionTariff/UpdateConsumptionTariff", updateConsumptionTariff)
    // /api/ConsumptionTariff/UpdateConsumptionTariff
  }

  deleteConsumptionTariff(meterRentId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/ConsumptionTariff/DeleteConsumptionTariff?ConsumptionTariffId=${meterRentId}`)

  }
//Ketena

  getKetena() {
    return this.http.get<IKetenaDto[]>(this.baseUrl + "/Ketena/GetKetena")
  }
  addKetena(addKetena: IKetenaDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Ketena/AddKetena", addKetena)
    // /api/Ketena/AddKetena
  }
  updateKetena(updateKetena: IKetenaDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/Ketena/UpdateKetena", updateKetena)
  }

  deleteKetena(KetenaId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Ketena/DeleteKetena?KetenaId=${KetenaId}`)

  
  }
  //Kebeles
  
  getKebeles() {
    return this.http.get<IKebelesDto[]>(this.baseUrl + "/Kebeles/GetKebeles")
  }
  addKebeles(addKebeles: IKebelesDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/Kebeles/AddKebeles", addKebeles)
    // /api/Kebeles/AddKebeles
  }
  updateKebeles(updateKebeles: IKebelesDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/Kebeles/UpdateKebeles", updateKebeles)
  }

  deleteKebeles(KebelesId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/Kebeles/DeleteKebeles?KebelesId=${KebelesId}`)

  }
  //Fiscal Month
  getFiscalMonth() {
    return this.http.get<IFiscalMonthDto[]>(this.baseUrl + "/FiscalMonth/GetFiscalMonth")
    // /api/FiscalMonth/GetFiscalMonth
  }

  
  updateFiscalMonth(updateFiscalMonth: IFiscalMonthDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/FiscalMonth/UpdateFiscalMonth", updateFiscalMonth)
  }

  deleteFiscalMonth(FiscalMonthId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/FiscalMonth/DeleteFiscalMonth?FiscalMonthId=${FiscalMonthId}`)

  }

  //generl interface
  getGeneralInterface(settingCategory: string) {

    return this.http.get<IGeneralInterfceDto[]>(this.baseUrl + `/GeneralInterface/GetGeneralInterface?ObjectCategory=${settingCategory}`)
  }
  addGeneralInterface(addGeneralInterface: IGeneralInterfceDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/GeneralInterface/AddGeneralInterface", addGeneralInterface)
  }
  updateGeneralInterface(updateGeneralInterface: IGeneralInterfceDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/GeneralInterface/UpdateGeneralInterface", updateGeneralInterface)
  }

  deleteGeneralInterface(GeneralInterfaceId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/GeneralInterface/DeleteGeneralInterface?GeneralInterfaceId=${GeneralInterfaceId}`)

  }
  //Penality Rate
  getPenalityRates() {
    return this.http.get<IPenalityRateDto[]>(this.baseUrl + `/PenalityRate/GetPenalityRates`)
  }

  getPenalityRateForUpdate(recordNo: number) {
    return this.http.get<IPenalityRateDto>(this.baseUrl + `/PenalityRate/GetPenalityRateForUpdate?recordNo=${recordNo}`)
  }


  addPenalityRate(addPenalityRate: IPenalityRateDto) {

    return this.http.post<ResponseMessage>(this.baseUrl + "/PenalityRate/AddPenalityRate", addPenalityRate)
  }


  updatePenalityRate(updatePenalityRate: IPenalityRateDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/PenalityRate/UpdatePenalityRate", updatePenalityRate)
    // /api/MeterSizeRent/UpdateMeterSizeRent
  }

  deletePenalityRate(PenalityRateId: number) {
    return this.http.delete<ResponseMessage>(this.baseUrl + `/PenalityRate/DeletePenalityRate?PenalityRateId=${PenalityRateId}`)

  }


}
