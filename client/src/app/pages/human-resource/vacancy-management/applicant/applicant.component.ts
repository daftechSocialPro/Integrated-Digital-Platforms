import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { ApplicantGetdto, InternalApplicant } from 'src/app/model/Vacancy/IApplicantDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  vaccancyId!: string
  applicantId!:string
  userView !: UserView
  employee !: EmployeeGetDto
  applicant !:ApplicantGetdto
  
  applicantDetail!:InternalApplicant
  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser()
    this.vaccancyId = this.route.snapshot.paramMap.get('id')!
    this.applicantId = this.route.snapshot.paramMap.get('applicantId')!
    this.getEmployee();    

    if(this.applicantId){

      this.getApplicantDetail(this.applicantId)
    }

  
  }
  constructor(
    private userService: UserService,
    private hrmService: HrmService,
    private commonService: CommonService,
    private vacancyService:VacancyService,
    private router: Router,
    private messageService:MessageService,
    private route: ActivatedRoute) { }

  getImagePath(url: string) {


    return this.commonService.createImgPath(url)
  }


  getEmployee() {

    this.hrmService.getEmployee(this.userView.employeeId).subscribe({
      next: (res) => {
        this.employee = res
        this.getApplicantList();
      }
    })


  }
  goToVacancy() {
    this.router.navigate(['/HRM/vacancyDetail', this.vaccancyId])

  }

  addApplicantProfile() {

    var applicantPost: InternalApplicant = {

      createdById: this.userView.userId,
      firstName: this.employee.firstName,
      middleName: this.employee.middleName,
      lastName: this.employee.lastName,     
      email: this.employee.email,
      imagePath : this.employee.imagePath,
      phoneNumber: this.employee.phoneNumber,
      gender: this.employee.gender,
      nationalityId:this.employee.nationalityId,
      birthDate:this.employee.birthDate,
      woreda:this.employee.woreda ,
      zoneId: this.employee.zoneId,
    }

    console.log(applicantPost)
    var formData = new FormData();
    for (let key in applicantPost) {
      if (applicantPost.hasOwnProperty(key)) {
        formData.append(key, (applicantPost as any)[key]);
      }
    }

    this.vacancyService.addInternalApplicant(formData).subscribe({

      next:(res)=>{
        if (res.success){                  
        
          this.vacancyService.applyForVacancy({
            applicantId: res.data.id,
            vacancyId:this.vaccancyId
          }).subscribe({
            next:(ress)=>{
              if(ress.success){
                this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });  
                window.location.reload() 
               }
              else {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });   
              }

            }
            ,error:(err)=>{
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
            }
          })
          
       
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

  getApplicantList(){

    this.vacancyService.getApplicantList(this.vaccancyId).subscribe({
      next:(res)=>{
        let app =  res.filter((item)=> item.phoneNumber.toLowerCase()==this.employee.phoneNumber.toString())
        if (app){
          this.applicant = app[0]

          console.log(this.applicant)
          this.getApplicantDetail(this.applicant.applicantId)
        }
      }
    })
  }

  getApplicantDetail(applicantId:string){

    this.vacancyService.getApplicantDetail(applicantId).subscribe({
      next:(res)=>{
        this.applicantDetail=res
        console.log(res)
      }
    })
  }

  finalizeApplicant(){
    
    this.vacancyService.finalizeApplicant(this.applicant.applicantId,this.vaccancyId).subscribe({
    
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
    })
  }

}
