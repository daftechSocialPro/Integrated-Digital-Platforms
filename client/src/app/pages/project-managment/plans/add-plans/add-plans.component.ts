import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';


import { PlanService } from '../../../../services/plan.service';
import { Plan, PlanView } from '../../../../model/PM/PlansDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService, toastPayload } from 'src/app/services/hrm.service';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  @Input() planView:PlanView
  toast !: toastPayload;
  planForm!: FormGroup;
  employee!: SelectList;
  Programs: SelectList[] = [];
  Structures: SelectList[] = [];
  Employees: SelectList[] = [];

  projectSourceFunds: SelectList[] = []

  Branchs: SelectList[] = [];
  employeeList: SelectList[] = [];

  ProjectManagerId!: SelectList;
  FinanceId!: string;

  fundBudget: number


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,

    private configurationService: ConfigurationService,
    private messageService: MessageService,
    private planService: PlanService,
    private commonService: CommonService,
    private dorpDownService: DropDownService) { }

  ngOnInit(): void {

    this.listEmployees();
    this.getDepartments();
    this.getProjectSourceFunds();

    console.log("planview",this.planView)

    if(this.planView){

    
      
    this.planForm = this.formBuilder.group({

      PlanName: [this.planView.planName, Validators.required],
      StructureId: [this.planView.structureId, Validators.required],
      PlanWeight: [this.planView.planWeight, [Validators.required]],
      HasTask: [this.planView.hasTask, Validators.required],
      PlandBudget: [this.planView.plandBudget, [Validators.required]],
      ProjectNumber: [this.planView.projectNumber, Validators.required],
      StartDate: [this.planView.startDate.split('T')[0], Validators.required],
      EndDate: [this.planView.endDate.split('T')[0], Validators.required],
      SelectedProjectFunds: [this.planView.projectFundIds, Validators.required],
      Remark: [''],
      Goal: [this.planView.goal],
      Objective: [this.planView.objective]

    })

    }else {

      this.planForm = this.formBuilder.group({

        PlanName: ['', Validators.required],
        StructureId: ['', Validators.required],
        PlanWeight: [0, [Validators.required]],
        HasTask: [false, Validators.required],
        PlandBudget: [0, [Validators.required]],
        ProjectNumber: ['', Validators.required],
        StartDate: ['', Validators.required],
        EndDate: ['', Validators.required],
        SelectedProjectFunds: ['', Validators.required],
        Remark: [''],
        Goal: [''],
        Objective: ['']
  
      })
    }


  }

  getRemainingBudget() {

    const selectedValues = this.planForm.get('SelectedProjectFunds').value;
    this.fundBudget = 0
    selectedValues.map((item) => {

      this.configurationService.getRemainingBudget(item).subscribe({
        next: (res) => {
          this.fundBudget += res
          this.planForm.get('PlandBudget').setValidators([Validators.max(this.fundBudget)]);
          this.planForm.get('PlandBudget').updateValueAndValidity();
        }

      })

    })
   

  }

  getDepartments() {

    this.dorpDownService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.Structures = res

        this.planForm.controls['StructureId'].setValue(this.planView.structureId)
      }
    })

  }

  getProjectSourceFunds() {

    this.dorpDownService.getProjectFundSourcess().subscribe({
      next: (res) => {
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
   
    console.log("add",event)
    // this.employee = event;
    this.ProjectManagerId = event

  }

  

  selectEmployeePM2(event: SelectList) {
   
    console.log("update",event)

    // this.employee = event;
    this.ProjectManagerId = event

  }


  selectEmployeeF(event: string) {

    // this.employee = event;
    this.FinanceId = event

  }


  submit() {



    if (!this.ProjectManagerId.id) {


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
        objective: this.planForm.value.Objective,
        startDate: this.planForm.value.StartDate,
        endDate: this.planForm.value.EndDate,
        projectNumber: this.planForm.value.ProjectNumber,
        projectFunds: this.planForm.value.SelectedProjectFunds
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
  update() {

console.log("p",this.ProjectManagerId)

    if (!this.ProjectManagerId) {


      this.messageService.add({ severity: 'error', summary: 'Netowrk Error', detail: "Project manager Not selected" });



      return
    }


    if (this.planForm.valid) {

      let planValue: Plan = {
        id:this.planView.id,
        hasTask: this.planForm.value.HasTask,
        planName: this.planForm.value.PlanName,
        planWeight: this.planForm.value.PlanWeight,
        plandBudget: this.planForm.value.PlandBudget,
        remark: this.planForm.value.Remark,
        structureId: this.planForm.value.StructureId,
        projectManagerId: this.ProjectManagerId.id,
        goal: this.planForm.value.Goal,
        objective: this.planForm.value.Objective,
        startDate: this.planForm.value.StartDate,
        endDate: this.planForm.value.EndDate,
        projectNumber: this.planForm.value.ProjectNumber,
        projectFunds: this.planForm.value.SelectedProjectFunds
      }


      this.planService.updatePlan(planValue).subscribe({
        
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfully Created.', detail: "Plan Successfully Updated" });
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
