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

    console.log('activity', this.activity)
  }

  addTargetForm() {


    let monthDiffernce = this.getMonthDifference(this.activity.startDate, this.activity.endDate)
    console.log('monthdiffernce', monthDiffernce)
    this.actTargets.removeAt(0)



    debugger

    var monthIndex = new Date(this.activity.startDate).getMonth();
    let total = monthDiffernce + monthIndex

    var i = 0
    while (i < monthDiffernce) {

      debugger

      if (monthIndex >= 12) {
        var k = monthIndex - 12
      
        const target = new FormGroup({
          monthName: new FormControl({ value: this.months[k], disabled: true }),
          monthValue: new FormControl(monthIndex, Validators.required),
          Target: new FormControl(0, Validators.required),
          Budget: new FormControl(0, Validators.required)
        });
        this.actTargets.push(target);
      }
      else {
        const target = new FormGroup({
          monthName: new FormControl({ value: this.months[monthIndex], disabled: true }),
          monthValue: new FormControl(monthIndex, Validators.required),
          Target: new FormControl(0, Validators.required),
          Budget: new FormControl(0, Validators.required)
        });
        this.actTargets.push(target);
      }


     
      monthIndex += 1
      i += 1;
      // if (monthIndex == total)
      //   break;


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

      for (let formValue of this.actTargets.value) {
        sumOfTarget += Number(formValue.Target)
        sumOfBudget += Number(formValue.Budget)

        let targetDivisionDto: TargetDivisionDto = {
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

      console.log("target act", ActivityTargetDivisionDto)


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
  closeModal() {
    this.activeModal.close()
  }

  getMonthDifference(startDate: string, endDate: string): number {

    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth();

    const monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);

    console.log('Month Difference:', monthDifference);

    return monthDifference;
  }


}