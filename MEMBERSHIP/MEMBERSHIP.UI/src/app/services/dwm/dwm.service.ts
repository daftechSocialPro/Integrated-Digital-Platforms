import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IMobileUsersDto } from "src/models/dwm/IMobileUsersDto";
import { UserService } from "../user.service";
import { ResponseMessage } from "src/models/ResponseMessage.Model";
import { IMobileAppReadingDto } from "src/models/dwm/IMobileAppReadingDto";
import { IQRCodeDto } from "src/models/dwm/IQRCodeDto";
import { IDWMDashboardDto } from "src/models/dwm/IDWMDashboardDto";
import { ICustomerCollectedDto } from "src/models/dwm/ICustomerCollectedDto";
import { IDWMPendingLogReportDto, IDWMReadingLogReportDto, IDwmReadingAccuracyReportDto, IDwmReadingConsumptionReportDto, IDwmReadingEfficencyReportDto, } from "src/models/dwm/IDWMReportDto";


@Injectable({
    providedIn: 'root'
})
export class DWMService {
    constructor(private http: HttpClient, private userService: UserService) { }
    readonly baseUrl = environment.baseUrl;


    //mobile users
    getMobileUsers() {
        return this.http.get<IMobileUsersDto[]>(this.baseUrl + "/MobileUsers/GetMobileUsers")
    }
    addMobileUsers(formData: FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/MobileUsers/AddMobileUsers", formData)
    }
    updateMobileUsers(formData: FormData) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/MobileUsers/UpdateMobileUsers", formData)

    }
    removeMobileUsers(id: number) {
        return this.http.delete<ResponseMessage>(this.baseUrl + `/MobileUsers/DeleteMobileUsers?MobileUsersId=${id}`)

    }

    // get mobile app readings
    getMobilReaderLength() {
        return this.http.get<number>(this.baseUrl + "/MobileAppReading/GetMobileReadingsLength")
    }

    GetMobileReadings(pageNumber: number, pageSize: number) {
        return this.http.get<IMobileAppReadingDto[]>(this.baseUrl + `/MobileAppReading/GetMobileReadings?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    InsertMobileAppReading(year: string, month: string, kebele: string) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/MobileAppReading/InsertMobileAppReading?year=${year}&month=${month}&kebele=${kebele}`, {})
    }
    ClearScript() {
        return this.http.delete<ResponseMessage>(this.baseUrl + `/MobileAppReading/ClearScript`)
    }

    generateQRCode(qrDatas: IQRCodeDto[]) {
        const httpOptions = {
            responseType: 'arraybuffer' as 'json', // Set the response type as 'arraybuffer'
            headers: { 'Content-Type': 'application/json' }
        };
        return this.http.post<any>(this.baseUrl + `/QRCodeGenerate/GetQRCodeGenerate`, qrDatas, httpOptions)
    }

    getDWMDashboardDetail(year: number, month: number) {
        return this.http.get<IDWMDashboardDto>(this.baseUrl + `/DWMDashboard/GetDashboardDetail?year=${year}&month=${month}`)
    }


    getCustomerCollected(contractNumber: string) {
        return this.http.get<ICustomerCollectedDto>(this.baseUrl + `/CustomerCollected/GetBillMobileData?contractNo=${contractNumber}`)
    }

    GetBillMobileDataByEntryDate(entryDT: string, userName: string) {
        return this.http.get<ICustomerCollectedDto>(this.baseUrl + `/CustomerCollected/GetBillMobileDataByEntryDate?entryDate=${entryDT}&userName=${userName}`)
    }

    //getReadingLog

    getReadingLog(month: number, year: number) {

        return this.http.get<IDWMReadingLogReportDto[]>(this.baseUrl + `/DWMReport/GetReadingLogReport?monthIndex=${month}&year=${year}`)

    }
    getPendingLog(month: number, year: number) {

        return this.http.get<IDWMPendingLogReportDto[]>(this.baseUrl + `/DWMReport/GetPendingLogReport?monthIndex=${month}&year=${year}`)

    }
    getGetReadingAccuracyReport(month: number, year: number) {

        return this.http.get<IDwmReadingAccuracyReportDto[]>(this.baseUrl + `/DWMReport/GetReadingAccuracyReport?monthIndex=${month}&year=${year}`)

    }

    getReadingEfficencyReport(month: number, year: number) {

        return this.http.get<IDwmReadingEfficencyReportDto[]>(this.baseUrl + `/DWMReport/GetReadingEfficencyReport?monthIndex=${month}&year=${year}`)

    }

    getReadingConsumptionReport(month: number, year: number) {

        return this.http.get<IDwmReadingConsumptionReportDto[]>(this.baseUrl + `/DWMReport/GetReadingConsumptionReport?monthIndex=${month}&year=${year}`)

    }
    



    
    


}