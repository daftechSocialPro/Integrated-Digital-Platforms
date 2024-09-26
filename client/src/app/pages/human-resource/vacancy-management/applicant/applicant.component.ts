import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem, MessageService } from 'primeng/api';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { AddInternalApplicantDto, ApplicantDetailDto} from 'src/app/model/Vacancy/IApplicantDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { ChangeStatusComponent } from './change-status/change-status.component';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  vaccancyId!: string;
  applicantId!: string;
  applicantDetail!: ApplicantDetailDto;
  employee!: EmployeeGetDto;
  userView!: UserView;
  isApplicant: boolean = false;
  items: any[] = [];

  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser()
    this.vaccancyId = this.route.snapshot.paramMap.get('id')!
    this.applicantId = this.route.snapshot.paramMap.get('applicantId')!
    this.getEmployee();    
    if(this.applicantId){
      this.getApplicantDetail(this.applicantId);
    }
  }

  constructor(
    private userService: UserService,
    private hrmService: HrmService,
    private commonService: CommonService,
    private vacancyService:VacancyService,
    private router: Router,
    private messageService:MessageService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }
    getImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }


  getEmployee() {
    this.hrmService.getEmployee(this.userView.employeeId).subscribe({
      next: (res) => {
        this.employee = res
        this.isApplicantRegisterd(res.id);
      }
    });
  }

  goToVacancy() {
    this.router.navigate(['/HRM/vacancyDetail', this.vaccancyId])
  }

  addApplicantProfile() {
    var applicantPost: AddInternalApplicantDto = {
      firstName: this.employee.firstName,
      middleName: this.employee.middleName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      imagePath: this.employee.imagePath,
      phoneNumber: this.employee.phoneNumber,
      gender: this.employee.gender,
      nationalityId: this.employee.nationalityId,
      birthDate: this.employee.birthDate,
      woreda: this.employee.woreda,
      zoneId: this.employee.zoneId,
    }

    var formData = new FormData();
    for (let key in applicantPost) {
      if (applicantPost.hasOwnProperty(key)) {
        formData.append(key, (applicantPost as any)[key]);
      }
    }

    this.vacancyService.addInternalApplicant(formData).subscribe({
      next:(res)=>{
        if (res.success){   
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });  
          window.location.reload();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
        }
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
      }
    })
  }

  isApplicantRegisterd(employeeId: string){
    this.vacancyService.checkApplicantProfile(employeeId).subscribe({
      next: (res) => {
        if(res){
          this.isApplicant = true;
          this.getApplicantDetail(res)
        }
        else {
          this.isApplicant = false;
        }
      }
    });
  }

  getItemsDropDown() {
    
    if (this.applicantDetail.applicantStatus == "APPLIED") {
      this.items = [
        {
          label: 'Set For Exam',
          command: () => {
            this.changeStatus(2);
          }
        },
        {
          label: 'Set For Interview',
          command: () => {
            this.changeStatus(3);
          }
        },
        {
          label: 'Reject',
          command: () => {
            this.changeStatus(4);
          }
        },
        {
          label: 'Black List',
          command: () => {
            this.changeStatus(6);
          }
        }
      ];
    }
    else if (this.applicantDetail.applicantStatus == "EXAM") {
      this.items = [
        {
          label: 'Set For Interview',
          command: () => {
            this.changeStatus(3);
          }
        },
        {
          label: 'Reject',
          command: () => {
            this.changeStatus(4);
          }
        },
        {
          label: 'Black List',
          command: () => {
            this.changeStatus(6);
          }
        }
      ];
    }
    else if (this.applicantDetail.applicantStatus == "INTERVIEW") {
      this.items = [
        {
          label: 'Hire',
          command: () => {
            this.changeStatus(5);
          }
        },
        {
          label: 'Reject',
          command: () => {
            this.changeStatus(4);
          }
        },
        {
          label: 'Black List',
          command: () => {
            this.changeStatus(6);
          }
        }
      ];
    }
    else {
      this.items = [
        {
          label: 'Black List',
          command: () => {
            this.changeStatus(6);
          }
        }
      ];
    }
  }

  
  getApplicantDetail(applicantId:string){
    this.vacancyService.getApplicantDetail(applicantId,this.vaccancyId).subscribe({
      next:(res)=>{
        this.applicantDetail = res
         this.getItemsDropDown();
      }
    })
  }

  startVacancy(){
    this.vacancyService.startVacancy(this.applicantDetail.id,this.vaccancyId).subscribe({
      next:(res)=>{
        if (res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
          window.location.reload()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message }); 
        }
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
      }
    });
  }

  finalizeApplicant(){

    this.vacancyService.finalizeApplicant(this.applicantDetail.id,this.vaccancyId).subscribe({
      next:(res)=>{
        if (res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
          window.location.reload()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message }); 
        }
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
      }
    });
  }

  getBadge(item: string) {
    if (item == 'APPLIED') {
      return 'success'
    }
    else if (item == 'REJECTED')
      return 'danger'
    else
      return 'warning'
  }

  changeStatus(statusType: number){
    let modalRef = this.modalService.open(ChangeStatusComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.applicantStatus = statusType,
    modalRef.componentInstance.applicantId = this.applicantDetail.id,
    modalRef.componentInstance.vacancyId = this.vaccancyId,
    modalRef.result.then(()=>{
      window.location.reload();
    });
  }


}
