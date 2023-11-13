import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';


import { PlanService } from '../../../../services/plan.service';
import { Plan } from '../../../../model/PM/PlansDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService, toastPayload } from 'src/app/services/hrm.service';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  toast !: toastPayload;
  planForm!: FormGroup;
  employee!: SelectList;
  Programs: SelectList[] = [];
  Structures: SelectList[] = [];
  Employees: SelectList[] = [];

  projectSourceFunds :SelectList[]=[]
  
  Branchs: SelectList[] = [];
  employeeList: SelectList[] = [];
  
  ProjectManagerId!: SelectList;
  FinanceId!: string;

  


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  
private messageService: MessageService,
    private planService : PlanService,
    private commonService: CommonService,
    private dorpDownService: DropDownService) { }

  ngOnInit(): void {

    this.listEmployees();
    this.getDepartments();
    this.getProjectSourceFunds();
   
    this.planForm = this.formBuilder.group({

      PlanName: ['', Validators.required],     
      StructureId: ['', Validators.required],    
      PlanWeight: [0, [Validators.required]],
      HasTask: [false, Validators.required],
      PlandBudget: [0, [Validators.required]],
      ProjectNumber: ['',Validators.required],
      StartDate:['',Validators.required],
      EndDate:['',Validators.required],
      SelectedProjectFunds :['',Validators.required],
 
      Remark: [''],
      Goal:[''],
      Objective :['']

    })

  }



  getDepartments(){

    this.dorpDownService.getDepartmentsDropdown().subscribe({
      next:(res)=>{
        this.Structures = res 
      }
    })

  }

  getProjectSourceFunds(){

    this.dorpDownService.getProjectFundSourcess().subscribe({
      next:(res)=>{
        this.projectSourceFunds = res 
      }
    })
  }
  

  listEmployees() {

    this.dorpDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeList = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }


 




  selectEmployeePM(event: SelectList) {

    // this.employee = event;
    this.ProjectManagerId = event

  }
  selectEmployeeF(event: string) {

    // this.employee = event;
    this.FinanceId = event

  }


  submit() {



    if (!this.ProjectManagerId){


      this.messageService.add({ severity: 'error', summary: 'Netowrk Error', detail: "Project manager Not selected" });

     

      return
    }


    if (this.planForm.valid) {

      let planValue: Plan = {        
        hasTask: this.planForm.value.HasTask,
        planName: this.planForm.value.PlanName,
        planWeight: this.planForm.value.PlanWeight,
        plandBudget: this.planForm.value.PlandBudget,      
        remark: this.planForm.value.Remark,
        structureId: this.planForm.value.StructureId,
        projectManagerId: this.ProjectManagerId.id,
        goal: this.planForm.value.Goal,
        objective :this.planForm.value.Objective,
        startDate : this.planForm.value.StartDate.getFullYear(),
        endDate : this.planForm.value.EndDate.getFullYear(),
        projectNumber:this.planForm.value.ProjectNumber,
        projectFunds:this.planForm.value.SelectedProjectFunds
      }

      
      this.planService.createPlan(planValue).subscribe({
        next: (res) => {

          
      this.messageService.add({ severity: 'success', summary: 'Successfully Created.', detail: "Plan Successfully Creted" });

          this.closeModal()

        }, error: (err) => {


          
      this.messageService.add({ severity: 'error', summary: 'Netowrk Error', detail: "Something went wrong!!" });

       

          console.log(err)
        }
      })
    }

  }



  
  closeModal() {
    this.activeModal.close();
  }



} 
