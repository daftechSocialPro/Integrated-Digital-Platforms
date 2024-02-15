import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import {  ActivityDetailDto, ActivityLocationDto, SubActivityDetailDto } from '../../../../model/PM/add-activities';
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
import { TaskService } from 'src/app/services/task.service';
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
  @Input() planId!:string

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
  strategicPlanIndicators: SelectList[]=[]
  projectLocations:SelectList[]=[]
  Employees: SelectList[] = [];
  minDate!: Date;

  maxDate!: Date ;

 



  projectFundSources: SelectList[]

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private dropDownService : DropDownService,
    private messageService : MessageService,
    private modalService : NgbModal,
    private dropService: DropDownService,
    private commonService: CommonService,
    private taskService : TaskService
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
      PreviousPerformance: [0, [Validators.required,Validators.min(0)]],
      Goal: [0,[Validators.required,Validators.min(0)]],
      WhomToAssign: [''],
      TeamId: [null],
      CommiteeId: [null],
      AssignedEmployee: [],
      StrategicPlan:[],
      StrategicPlanIndicatorId:[,Validators.required],
      IsTraining:[false,Validators.required],
      IsPercentage:[false,Validators.required],
  
      SelectedProjectFund:['',Validators.required],
      regionss: [[]],
      locations: this.formBuilder.array([])


    })
  }
  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.getCountries()

    this.ListofEmployees()
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
  this.getProjectFundSourse()

  }

  getProjectFundSourse(){

    this.dropDownService.GetProjectFundSourcesForActivity(this.planId).subscribe({
      next:(res)=>{
        this.projectFundSources = res 
      }
    })
  }

  ListofEmployees() {

    this.taskService.getEmployeeNoTaskMembers(this.task.id!).subscribe({
      next: (res) => {
        this.Employees = res
      }
      , error: (err) => {
        console.error(err)
      }
    })

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

  GetIndicatorsByStrategicPlanIds(strategicPlanId: string){
    
    this.dropDownService.getIndicatorByStrategicPlanId(strategicPlanId).subscribe({
      next:(res)=>{
        this.strategicPlanIndicators = res
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
        //this.addSubActivity()
    }
    else{
          this.addActivityParent()
    }
  }



  addActivityParent(){
    
    // if(this.lat==0||this.lng==0){
    //   this.messageService.add({severity:'error',summary:"Location Not Selected",detail:'Please choose a location from map!!'})
    //   return
    // }
    console.log("ADDED ACTIVITY XXXXXXXXXXXx",this.activityForm.value)
    
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
        RegionId:this.activityForm.value.RegionId,
        Zone:this.activityForm.value.Zone,
        Woreda :this.activityForm.value.Woreda,
        StrategicPlanIndicatorId:this.activityForm.value.StrategicPlanIndicatorId,
        IsTraining:this.activityForm.value.IsTraining,   
        IsPercentage:this.activityForm.value.IsPercentage,
        activityLocations : this.activityForm.value.locations,
        // longtude: this.lng,
        // latitude: this.lat,
        selectedProjectFund:this.activityForm.value.SelectedProjectFund
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

  addLocation(regionId,locationGroup){
    event.preventDefault()
    let modalRef = this.modalService.open(AddProjectLocationComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.calledFrom= 1
    modalRef.componentInstance.regionId = regionId

    modalRef.result.then((res)=>{


  
      locationGroup.patchValue({
        longtude: res.lng,
        latitude: res.lat
      });
      console.log(res)
    })

    
  }


  updateLocationForms() {
    const selectedRegionIds = this.activityForm.get('regionss')?.value; // Get the selected region IDs
    var regionName =''
    // Check if locations is a FormArray
    if (this.locations instanceof FormArray) {
        const currentLocationForms = this.locations;

        // Remove location forms that are no longer selected
        for (let i = currentLocationForms.length - 1; i >= 0; i--) {
            const locationForm = currentLocationForms.at(i) as FormGroup;
            const regionId = locationForm.get('regionId')?.value;
           

            if (!selectedRegionIds.includes(regionId)) {
                this.locations.removeAt(i);
            }
        }

        // Add location forms for newly selected regions
        selectedRegionIds.forEach((regionId: string) => {

          console.log(regionId)
            const locationFormExists = currentLocationForms.controls.some((locationForm) => {
                const existingRegionId = (locationForm as FormGroup).get('regionId')?.value;
                return existingRegionId === regionId;
            });

            regionName = this.regions.filter(x=>x.id.toLowerCase()==regionId.toLowerCase())[0].name
        
            if (!locationFormExists) {
                const locationGroup = this.formBuilder.group({
                    regionName:regionName,
                    regionId: regionId,
                    zone: '',
                    woreda: '',
                    latitude:'',
                    longtude:''
                });                

                this.locations.push(locationGroup);
            }
        });
    }

    console.log(this.locations.value)
}


  // Getter for easier access to the locations FormArray
  get locations() {
    return this.activityForm.get('locations') as FormArray;
  }

  get regionss() {
    return this.activityForm.get('regionss');
  }




}
