import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { EmployeeHistoryDto, EmployeeHistoryPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employment-history',
  templateUrl: './update-employment-history.component.html',
  styleUrls: ['./update-employment-history.component.css']
})
export class UpdateEmploymentHistoryComponent implements OnInit {

 
  @Input() employeeHistory! :EmployeeHistoryDto
 
  HistoryForm !: FormGroup;
  departments!: SelectList[];
  positions!: SelectList[];
  user ! : UserView
  countries !: SelectList[];
  regions!: SelectList[];
  zones ! : SelectList[];
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getDepartments()
    this.getPositions()
    this.getCountries();
    this.getZones(this.employeeHistory.regionId)
    this.getRegions(this.employeeHistory.countryId)
    this.HistoryForm.controls['departmentId'].setValue(this.employeeHistory.departmentId)
    this.HistoryForm.controls['positionId'].setValue(this.employeeHistory.positionId) 
    this.HistoryForm.controls['salary'].setValue(this.employeeHistory.salary)    
    this.HistoryForm.controls['startDate'].setValue(this.employeeHistory.startDate.toString().split('T')[0])  
    this.HistoryForm.controls['endDate'].setValue(this.employeeHistory.endDate.toString().split('T')[0])
    this.HistoryForm.controls['sourceOfSalary'].setValue(this.employeeHistory.sourceOfSalary)
    this.HistoryForm.controls['remark'].setValue(this.employeeHistory.remark)
    this.HistoryForm.controls['woreda'].setValue(this.employeeHistory.woreda)
    this.HistoryForm.controls['zoneId'].setValue(this.employeeHistory.zoneId)
    this.HistoryForm.controls['country'].setValue(this.employeeHistory.countryId)
    this.HistoryForm.controls['region'].setValue(this.employeeHistory.regionId)
  }
  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService : MessageService,
    private  dropService: DropDownService) {

      this.HistoryForm = this.formBuilder.group({        
       
        departmentId: [null, Validators.required],
        positionId: [null, Validators.required],
        salary: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        sourceOfSalary:[null,Validators.required],
        remark : [null,Validators.required],
        woreda: [null, Validators.required],
        zoneId: [null, Validators.required],
        country: [null, Validators.required],
        region: [null, Validators.required],
      })
     }

     getCountries() {

      this.dropService.getContriesDropdown().subscribe({
        next: (res) => {
          this.countries = res
        }
      });
    }
  
    getRegions(countryId: string) {
  
      this.dropService.getRegionsDropdown(countryId).subscribe({
        next: (res) => {
          this.regions = res
        }
      })
    }
  
    getZones (regionId:string){
      this.dropService.getZonesDropdown(regionId).subscribe({
        next: (res) => {
          this.zones = res
        }
      })
    }
  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res
      }
    })
  }

  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    })
  }
  closeModal() {
    this.activeModal.close()
  }

  submit(){
    if (this.HistoryForm.valid){

      var employeeHistory : EmployeeHistoryPostDto={

        id:this.employeeHistory.id,
        departmentId : this.HistoryForm.value.departmentId,
        positionId : this.HistoryForm.value.positionId,
        salary : this.HistoryForm.value.salary,
        startDate : this.HistoryForm.value.startDate,
        endDate : this.HistoryForm.value.endDate,
        createdById : this.user.userId,
        employeeId : this.employeeHistory.employeeId,
        sourceOfSalary : this.HistoryForm.value.sourceOfSalary,
        remark : this.HistoryForm.value.remark,
        woreda : this.HistoryForm.value.woreda,
        zoneId : this.HistoryForm.value.zoneId
      }
      this.hrmService.updateEmployeeHistory(employeeHistory).subscribe(
        {
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
            
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
            
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        }
      )

    }

  }

}
