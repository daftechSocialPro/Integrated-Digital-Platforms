import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { DashboardNumericalDTo, FilterCriteriaDto } from '../demo/admin-dashbord/IDashboardDto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getNumbericalData(filterCriteriaDto: FilterCriteriaDto) {

    let params = new HttpParams();
    for (const key in filterCriteriaDto) {
      if (filterCriteriaDto[key] !== null && filterCriteriaDto[key] !== undefined) {
        params = params.set(key, filterCriteriaDto[key]);
      }
    }


    return this.http.get<DashboardNumericalDTo>(this.baseUrl + '/Dashboard/GetNumbericalData',{params});
  }
}
