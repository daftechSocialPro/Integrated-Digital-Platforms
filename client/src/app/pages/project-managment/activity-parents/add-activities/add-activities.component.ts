import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import {  ActivityDetailDto, SubActivityDetailDto } from '../../../../model/PM/add-activities';
import { TaskView } from 'src/app/model/PM/TaskDto';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { toastPayload } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MessageService } from 'primeng/api';
import { AddProjectLocationComponent } from '../../pm-configuration/project-location/add-project-location/add-project-location.component';
declare const $: any

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnInit {

  @Input() task!: TaskView;
  @Input() requestFrom!: string;
  @Input() requestFromId!: string;
  @Input() dateAndTime!:GetStartEndDate

  countries !: SelectList[];
  regions!: SelectList[];
  zones ! : SelectList[];

  activityForm!: FormGroup;
  selectedEmployee: SelectList[] = [];
  user !: UserView;
  committees: SelectList[] = [];
  unitMeasurments: SelectList[] = [];
  toast!: toastPayload;
  comitteEmployees : SelectList[]=[];

  strategicPlans:SelectList[]=[]
  projectLocations:SelectList[]=[]

  minDate!: Date;

    maxDate!: Date ;

  lat = 0 
  lng = 0

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private dropDownService : DropDownService,
    private messageService : MessageService,
    private modalService : NgbModal,
    private dropService: DropDownService,
    private commonService: CommonService
  ) {

    this.activityForm = this.formBuilder.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      ActivityDescription: ['', Validators.required],
      ActivityNumber:['',Validators.required],
      PlannedBudget: ['', [Validators.required,Validators.max(this.task?.remainingBudget!)]],
      ActivityType: [''],
      OfficeWork: [0, Validators.required],
      FieldWork: [0, Validators.required],
      UnitOfMeasurement: ['', Validators.required],
      PreviousPerformance: [0, [Validators.required,Validators.max(100),Validators.min(0)]],
      Goal: [0,[Validators.required,Validators.max(100),Validators.min(0)]],
      WhomToAssign: [''],
      TeamId: [null],
      CommiteeId: [null],
      AssignedEmployee: [],
      StrategicPlan:[],
      IsTraining:[false,Validators.required],
      ZoneId:['',Validators.required],
      Woreda:['',Validators.required]


    })
  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.getCountries()

    this.GetStrategicPlans()
    this.pmService.getComitteeSelectList().subscribe({
      next: (res) => {
        this.committees = res
      }, error: (err) => {
        console.log(err)
      }
    })

    this.dropDownService.GetUnitOfMeasurment().subscribe({
      next: (res) => {
        this.unitMeasurments = res
      }, error: (err) => {
        console.log(err)
      }
    })


    console.log("add",this.dateAndTime)
    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setDate(1)
    this.minDate.setMonth(1)
    this.minDate.setFullYear(Number(this.dateAndTime.fromDate));

    this.maxDate.setDate(1)
    this.maxDate.setMonth(1)
    this.maxDate.setFullYear(Number(this.dateAndTime.endDate));
    // $('#StartDate').calendarsPicker({
    //   calendar: $.calendars.instance('ethiopian', 'am'),

    //   onSelect: (date: any) => {
      
    //     this.activityForm.controls['StartDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
    //   },
    // })
    // $('#EndDate').calendarsPicker({
    //   calendar: $.calendars.instance('ethiopian', 'am'),

    //   onSelect: (date: any) => {
    //     this.activityForm.controls['EndDate'].setValue(date[0]._month+"/"+date[0]._day+"/"+date[0]._year)
       
    //   },
    // })

   // this.GetProjectLocations()

  }

  getCountries() {

    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res
      }
    })
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



  GetStrategicPlans(){

    this.dropDownService.getStrategicPlans().subscribe({
      next:(res)=>{
        this.strategicPlans = res
      }
    })
  }

  // GetProjectLocations(){
  //   this.dropDownService.getProjectLocations().subscribe({
  //     next:(res)=>{
  //       this.projectLocations = res
  //     }
  //   })
  // }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event)
    this.task.taskMembers = this.task.taskMembers!.filter(x => x.id != event.id)

  }

  removeSelected(emp: SelectList) {

    this.selectedEmployee = this.selectedEmployee.filter(x => x.id != emp.id)
    this.task.taskMembers!.push(emp)

  }

  submit() {

    console.log(this.activityForm.value)
    if(this.requestFrom == "PLAN" || this.requestFrom == "TASK"){
        this.addSubActivity()
    }
    else{
          this.addActivityParent()
    }
  }

  addSubActivity(){

    if(this.lat==0||this.lng==0){
      this.messageService.add({severity:'error',summary:"Location Not Selected",detail:'Please choose a location from map!!'})
      return
    }
    if(this.activityForm.value.Goal<=this.activityForm.value.PreviousPerformance){
      this.messageService.add({severity:'error',summary:"Baseline Target Error",detail:'Baseline can not be Greater or equal to Target !!'})
      return
    }

    if (this.activityForm.valid) {
      let actvityP: SubActivityDetailDto = {
        SubActivityDesctiption: this.activityForm.value.ActivityDescription,
        StartDate: this.activityForm.value.StartDate,
        EndDate: this.activityForm.value.EndDate,
        PlannedBudget: this.activityForm.value.PlannedBudget,
        ActivityNumber:this.activityForm.value.ActivityNumber,
        ActivityType: this.activityForm.value.ActivityType,
        OfficeWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.OfficeWork : this.activityForm.value.ActivityType == 1 ? 100 : 0,
        FieldWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.FieldWork : this.activityForm.value.ActivityType == 2 ? 100 : 0,
        UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
        PreviousPerformance: this.activityForm.value.PreviousPerformance,
        Goal: this.activityForm.value.Goal,
        TeamId: this.activityForm.value.TeamId,
        CommiteeId: this.activityForm.value.CommiteeId,
        Employees: this.activityForm.value.AssignedEmployee,
        CreatedBy:this.user.userId,
        longtude: this.lng,
        latitude: this.lat,
        StrategicPlanId:this.activityForm.value.StrategicPlan,
        ZoneId:this.activityForm.value.ZoneId,
        Woreda:this.activityForm.value.Woreda ,
        IsTraining:this.activityForm.value.IsTraining      
        
      }
      if(this.requestFrom == "PLAN"){
        actvityP.PlanId = this.requestFromId;
      }
      else if(this.requestFrom == "TASK"){
        actvityP.TaskId = this.requestFromId;
      }

 
      console.log("sdfsdfd",actvityP)

      this.pmService.addSubActivity(actvityP).subscribe({
        next: (res) => {

          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Activity Successfully Created' });        
    
          window.location.reload()
          this.closeModal()
         
        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: err.message });        
        
          console.error(err)
        }
      })
    }
  }

  addActivityParent(){
    
    if(this.lat==0||this.lng==0){
      this.messageService.add({severity:'error',summary:"Location Not Selected",detail:'Please choose a location from map!!'})
      return
    }
    if(this.activityForm.value.Goal<=this.activityForm.value.PreviousPerformance){
      this.messageService.add({severity:'error',summary:"Baseline Target Error",detail:'Baseline can not be Greater or equal to Target !!'})
      return
    }
    if (this.activityForm.valid) {
      let actvityP: SubActivityDetailDto = {
        SubActivityDesctiption: this.activityForm.value.ActivityDescription,
        StartDate: this.activityForm.value.StartDate,
        EndDate: this.activityForm.value.EndDate,
        PlannedBudget: this.activityForm.value.PlannedBudget,
        ActivityNumber :this.activityForm.value.ActivityNumber,       
        ActivityType: this.activityForm.value.ActivityType,
        OfficeWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.OfficeWork : this.activityForm.value.ActivityType == 1 ? 100 : 0,
        FieldWork: this.activityForm.value.ActivityType == 0 ? this.activityForm.value.FieldWork : this.activityForm.value.ActivityType == 2 ? 100 : 0,
        UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
        PreviousPerformance: this.activityForm.value.PreviousPerformance,
        Goal: this.activityForm.value.Goal,
        TeamId: this.activityForm.value.TeamId,
        CommiteeId: this.activityForm.value.CommiteeId,
        Employees: this.activityForm.value.AssignedEmployee,
        StrategicPlanId:this.activityForm.value.StrategicPlan,
        ZoneId:this.activityForm.value.ZoneId,
        Woreda :this.activityForm.value.Woreda,
        IsTraining:this.activityForm.value.IsTraining,   
        longtude: this.lng,
        latitude: this.lat,
      }

      console.log("rrrrrrrrrrrrr",actvityP)

      if(this.requestFrom == "Plan"){
        actvityP.PlanId = this.requestFromId;
      }
      else if(this.requestFrom == "Task"){
        actvityP.TaskId = this.requestFromId;
      }

      let activityList : SubActivityDetailDto[] = [];
      activityList.push(actvityP);

      let addActivityDto: ActivityDetailDto = {
        ActivityDescription: this.activityForm.value.ActivityDescription,
        HasActivity: false,
        TaskId: this.task.id!,
        CreatedBy: this.user.userId,
        ActivityDetails: activityList
      }
      console.log("activity detail", addActivityDto)
      this.pmService.addActivityParent(addActivityDto).subscribe({
        next: (res) => {
      

          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Activity Successfully Created' });        
           
          window.location.reload()
         
          this.closeModal()
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });        
    
          console.error(err)
        }
      })
    }
  }




  closeModal() {
    this.activeModal.close()
  }

  onCommiteChange(comitteId :string){

    debugger

    this.pmService.getComitteEmployees(comitteId).subscribe({
      next:(res)=>{
        this.comitteEmployees = res 
      },
      error:(err)=>{    
      }
    })
  }

  addLocation(){

    let modalRef = this.modalService.open(AddProjectLocationComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.calledFrom=1

    modalRef.result.then((res)=>{

      this.lng = res.lng
      this.lat = res.lat
      console.log(res)
    })

    
  }


}
