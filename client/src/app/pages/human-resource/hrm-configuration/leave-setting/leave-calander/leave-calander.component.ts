import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeavePlanSettingGetDto } from 'src/app/model/HRM/ILeaveDto';
import { IEvoCalanderDto } from 'src/app/model/common';
declare const $: any

@Component({
  selector: 'app-leave-calander',
  templateUrl: './leave-calander.component.html',
  styleUrls: ['./leave-calander.component.css']
})
export class LeaveCalanderComponent implements OnInit {

  @Input() LeavePlanSettings: LeavePlanSettingGetDto[] = []
  calanders: IEvoCalanderDto[] = []

  ngOnInit(): void {
    this.intializeCalander()

  }
  constructor(private activeModal: NgbActiveModal) { }


  closeModal() {
    this.activeModal.close()
  }

  intializeCalander() {


    $('#calendar').evoCalendar({
      'language': 'en',
      'theme': 'Royal Navy',
      // Supported language: en, es, de..
    });

    var startDate = new Date('2023-01-01');
    var endDate = new Date('2023-12-31');

    for (var leave of this.LeavePlanSettings.filter(x=>x.leavePlanSettingStatus=="APPROVED")) {

      var startDate = new Date(leave.fromDate)
      var endDate = new Date(leave.toDate)

      while (startDate <= endDate) {

        var calander: IEvoCalanderDto = {
          id: leave.id,
          name: leave.employeeName,
          description: 'Leave plan',
          badge: leave.leavePlanSettingStatus,
          date: startDate.toString(),
          type: 'event',
          everyYear: false
        }

        this.calanders.push(calander)
        startDate.setDate(startDate.getDate() + 1);
       
      }
    }

    $('#calendar').evoCalendar('addCalendarEvent', this.calanders);

  }

}

