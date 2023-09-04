import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId! : string ; 
  employee! : EmployeeGetDto
  ngOnInit(): void {
    this.employeeId = this.router.snapshot.paramMap.get('employeeId')!
    this.getEmployee()
  }

  constructor( 
    private router : ActivatedRoute,
    private route: Router, 
    private hrmService: HrmService,
    private commonService: CommonService){}

  getEmployee (){

    this.hrmService.getEmployee(this.employeeId).subscribe({
      next:(res)=>{
        this.employee = res 
      }
    })
  }
  getImagePath(url:string){

    return this.commonService.createImgPath(url)
  }

  callcuclateAge (date : Date ){

    return this.commonService.calculateAge(date)
  }
  employeeList(){

    this.route.navigate(["HRM/employeeMangment"])
  }


}
