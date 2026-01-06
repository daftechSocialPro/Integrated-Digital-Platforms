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

  @Input() planView: PlanView
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
  financeManagerId!: SelectList
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



    if (this.planView) {



      this.planForm = this.formBuilder.group({

        PlanName: [this.planView.planName, Validators.required],
        StructureId: [this.planView.structureId, Validators.required],
        PlanWeight: [this.planView.planWeight, [Validators.required]],
        HasTask: [this.planView.hasTask, Validators.required],
        PlandBudget: [this.planView.plandBudget, [Validators.required]],
        ProjectNumber: [this.planView.projectNumber, Validators.required],
        StartDate: [this.planView.startDate ? this.planView.startDate.split('T')[0] : '', Validators.required],
        EndDate: [this.planView.endDate ? this.planView.endDate.split('T')[0] : '', Validators.required],
        SelectedProjectFunds: [this.planView.projectFundIds || [], Validators.required],
        Remark: [this.planView.remark || ''],
        Goal: [this.planView.goal || ''],
        Objective: [this.planView.objective || '']

      })

    } else {

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

        if (this.planView && this.planView.structureId && this.planForm) {
          // Ensure the structureId is set correctly, matching the format from dropdown
          const structureId = this.planView.structureId.toUpperCase();
          this.planForm.controls['StructureId'].setValue(structureId);
        }
      }
    })

  }

  getProjectSourceFunds() {

    this.dorpDownService.getProjectFundSourcess().subscribe({
      next: (res) => {
        this.projectSourceFunds = res
        
        // Ensure project funds are set correctly in update mode
        if (this.planView && this.planView.projectFundIds && this.planForm) {
          // Convert to uppercase to match dropdown format
          const fundIds = this.planView.projectFundIds.map(id => id.toUpperCase());
          this.planForm.controls['SelectedProjectFunds'].setValue(fundIds);
        }
      }
    })
  }


  listEmployees() {

    this.dorpDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeList = res
        
        // Initialize Project Manager and Finance Manager from planView if in update mode
        if (this.planView && this.planView.projectManagerId) {
          const pm = res.find(emp => emp.id.toLowerCase() === this.planView.projectManagerId.toLowerCase());
          if (pm) {
            this.ProjectManagerId = pm;
          }
        }
        
        if (this.planView && this.planView.financeManagerId) {
          const fm = res.find(emp => emp.id.toLowerCase() === this.planView.financeManagerId.toLowerCase());
          if (fm) {
            this.financeManagerId = fm;
          }
        }
      }, error: (err) => {

      }
    })
  }







  selectEmployeePM(event: SelectList) {


    // this.employee = event;
    this.ProjectManagerId = event

  }



  selectEmployeePM2(event: SelectList) {


    // this.employee = event;
    this.ProjectManagerId = event

  }


  selectEmployeeF(event: SelectList) {

    // this.employee = event;
    this.financeManagerId = event

  }


  submit() {



    if (!this.ProjectManagerId.id || !this.financeManagerId.id) {


      this.messageService.add({ severity: 'error', summary: 'Netowrk Error', detail: "Project manager or Finance manager Not selected" });



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
        financeManagerId: this.financeManagerId.id,
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


        }
      })
    }

  }
  update() {



    if (!this.ProjectManagerId || !this.ProjectManagerId.id) {


      this.messageService.add({ severity: 'error', summary: 'Network Error', detail: "Project manager Not selected" });



      return
    }

    if (!this.financeManagerId || !this.financeManagerId.id) {
      this.messageService.add({ severity: 'error', summary: 'Network Error', detail: "Finance manager Not selected" });
      return
    }


    if (this.planForm.valid) {

      let planValue: Plan = {
        id: this.planView.id,
        hasTask: this.planForm.value.HasTask,
        planName: this.planForm.value.PlanName,
        planWeight: this.planForm.value.PlanWeight,
        plandBudget: this.planForm.value.PlandBudget,
        remark: this.planForm.value.Remark || '',
        structureId: this.planForm.value.StructureId,
        projectManagerId: this.ProjectManagerId.id,
        financeManagerId: this.financeManagerId.id,
        goal: this.planForm.value.Goal || '',
        objective: this.planForm.value.Objective || '',
        startDate: this.planForm.value.StartDate,
        endDate: this.planForm.value.EndDate,
        projectNumber: this.planForm.value.ProjectNumber,
        projectFunds: this.planForm.value.SelectedProjectFunds
      }


      this.planService.updatePlan(planValue).subscribe({

        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfully Updated.', detail: "Plan Successfully Updated" });
          this.closeModal()

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Network Error', detail: "Something went wrong!!" });

        }
      })
    }

  }



  closeModal() {
    this.activeModal.close();
  }



} 
