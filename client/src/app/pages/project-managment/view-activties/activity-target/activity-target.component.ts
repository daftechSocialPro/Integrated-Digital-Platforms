import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { ActivityView, TargetDivisionDto, ActivityTargetDivisionDto } from '../activityview';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-target',
  templateUrl: './activity-target.component.html',
  styleUrls: ['./activity-target.component.css']
})
export class ActivityTargetComponent implements OnInit {

  @Input() activity!: ActivityView;
  targetForm !: FormGroup;
  user!: UserView;

  remainingTarget:number=0
  remainingBudget:number=0

  actTargets = new FormArray([
    new FormGroup({
      year: new FormControl(''),
      monthName: new FormControl({ value: 'January', disabled: true }),
      monthValue: new FormControl(0, Validators.required),
      Target: new FormControl(0, Validators.required),
      Budget: new FormControl(0, Validators.required)
    })
  ])

  months: string[] = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private userService: UserService,
    private messageService: MessageService,
    private pmService: PMService) { }

  ngOnInit(): void {
    this.addTargetForm();
    this.user = this.userService.getCurrentUser();

    if(this.activity){
      this.remainingBudget = this.activity.plannedBudget
      this.remainingTarget  = this.activity.target- this.activity.begining
    }
this.onTargetChange()

  }

  addTargetForm() {
    const monthDifferences = this.getMonthDifference(this.activity.startDate, this.activity.endDate);
    const years = Object.keys(monthDifferences);
  
    this.actTargets.clear();
  
    for (let i = 0; i < years.length; i++) {
      const year = years[i];


      const months = monthDifferences[year];
      const isFirstYear = i === 0;
      const startMonthIndex = isFirstYear ? new Date(this.activity.startDate).getMonth() : 0;
  
      for (let j = 0; j < months; j++) {
        const monthIndex = (startMonthIndex + j) % 12;
        const monthName = this.months[monthIndex];
  
        const targetFormGroup = new FormGroup({
          year: new FormControl(year),
          monthName: new FormControl({ value: monthName, disabled: true }),
          monthValue: new FormControl(monthIndex, Validators.required),
          Target: new FormControl(0, Validators.required),
          Budget: new FormControl(0, Validators.required)
        });
        
        const monthPerformance = this.activity.monthPerformance.find(performance => performance.order === monthIndex && performance.year === parseInt(year));
  
        if (monthPerformance) {
          targetFormGroup.patchValue({
            
            Target: monthPerformance.planned,
            Budget: monthPerformance.plannedBudget
          });
        }
       
  
        this.actTargets.push(targetFormGroup);
      }
    }
  }

  

  onTargetChange(){
    
    var sumOfTarget = 0
    var sumOfBudget = 0
    for (let formValue of this.actTargets.value) {
      sumOfTarget += Number(formValue.Target)
      sumOfBudget += Number(formValue.Budget)
  }

  this.remainingTarget = (this.activity.target - this.activity.begining)-sumOfTarget
  this.remainingBudget = this.activity.plannedBudget-sumOfBudget
}




  submitTarget() {

    if (this.actTargets.valid) {
      var sumOfTarget = 0
      var sumOfBudget = 0

      let targetDivisionDtos: TargetDivisionDto[] = []


      // 
      
      for (let formValue of this.actTargets.value) {
        
        sumOfTarget += Number(formValue.Target)
        sumOfBudget += Number(formValue.Budget)

        let targetDivisionDto: TargetDivisionDto = {
          year: Number(formValue.year),
          order: Number(formValue.monthValue),
          target: Number(formValue.Target),
          targetBudget: Number(formValue.Budget)
        }

        targetDivisionDtos.push(targetDivisionDto)
      }

     
      let ActivityTargetDivisionDto: ActivityTargetDivisionDto = {

        activiyId: this.activity.id,
        createdBy: this.user.userId,
        targetDivisionDtos: targetDivisionDtos
      }





      if (sumOfTarget != (this.activity.target - this.activity.begining)) {


        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity target not equal to target of Activity' });


        return

      }

      if (sumOfBudget != this.activity.plannedBudget) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity Budget not equal to Planned Budget' });


        return

      }



      this.pmService.addActivityTargetDivision(ActivityTargetDivisionDto).subscribe({
        next: (res) => {

          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: 'Activity Target Assigned successFully' });


          this.closeModal()
          window.location.reload()

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: err.message });


        }
      })
    }
    else {


    }
  }
  updateTarget() {

    if (this.actTargets.valid) {
      var sumOfTarget = 0
      var sumOfBudget = 0

      let targetDivisionDtos: TargetDivisionDto[] = []


      // 
      
      for (let formValue of this.actTargets.value) {
     
        sumOfTarget += Number(formValue.Target)
        sumOfBudget += Number(formValue.Budget)
        
        let targetDivisionDto: TargetDivisionDto = {
          year: Number(formValue.year),
          order: Number(formValue.monthValue),
          target: Number(formValue.Target),
          targetBudget: Number(formValue.Budget)
        }

        targetDivisionDtos.push(targetDivisionDto)
      }
     
     
      let ActivityTargetDivisionDto: ActivityTargetDivisionDto = {

        activiyId: this.activity.id,
        createdBy: this.user.userId,
        targetDivisionDtos: targetDivisionDtos
      }





      if (sumOfTarget != (this.activity.target - this.activity.begining)) {


        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity target not equal to target of Activity' });


        return

      }

      if (sumOfBudget != this.activity.plannedBudget) {
        this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: 'Sum of Activity Budget not equal to Planned Budget' });


        return

      }


      this.pmService.updateActivityTargetDivision(ActivityTargetDivisionDto).subscribe({
        next: (res) => {

          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: 'Activity Target Assigned successFully' });


          this.closeModal()
          window.location.reload()

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: err.message });


        }
      })
    }
    else {


    }
  }
  closeModal() {
    this.activeModal.close()
  }




  getMonthDifference(startDate: string, endDate: string): { [year: number]: number } {
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth();
    
    const monthDifference: { [year: number]: number } = {};
  
    for (let year = startYear; year <= endYear; year++) {
      let monthStart = 0;
      let monthEnd = 11;
  
      if (year === startYear) {
        monthStart = startMonth;
      }
  
      if (year === endYear) {
        monthEnd = endMonth;
      }
  
      const months = (monthEnd - monthStart) + 1;
      monthDifference[year] = months;
    }
  
  
    return monthDifference;
  }
}