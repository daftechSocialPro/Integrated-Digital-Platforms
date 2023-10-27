import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeavePlanSettingGetDto, LeavePlanSettingUpdateDto, LeaveTypeGetDto } from 'src/app/model/HRM/ILeaveDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddLeaveTypeComponent } from '../leave-type/add-leave-type/add-leave-type.component';
import { UpdateLeaveTypeComponent } from '../leave-type/update-leave-type/update-leave-type.component';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';
import { AddLeaveSettingComponent } from './add-leave-setting/add-leave-setting.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomConfirmationComponent } from '../../leave/leave-requests/custom-confirmation/custom-confirmation.component';
import { SelectList } from 'src/app/model/common';
import { LeaveCalanderComponent } from './leave-calander/leave-calander.component';

@Component({
  selector: 'app-leave-setting',
  templateUrl: './leave-setting.component.html',
  styleUrls: ['./leave-setting.component.css']
})
export class LeaveSettingComponent implements OnInit {


  filters: SelectList[] = [{ name: "Mine", id: '1' }, { "name": "Requests", id: '2' }];
  selected:SelectList={ name: "Mine", id: '1' }
  LeavePlanSettings!: LeavePlanSettingGetDto[]
  user!: UserView
  leaveRequest: any;
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getLeavePlans()
  }

  constructor(
    private hrmService: HrmService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
    public dialogService: DialogService,
    private userService: UserService) { }


  getLeavePlans() {
    this.hrmService.getEmployeeLeavePlan(this.user.employeeId).subscribe({
      next: (res) => {
        this.LeavePlanSettings = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  getEmployeeLeavePlans() {
    this.hrmService.getEmployeeLeavePlans().subscribe({
      next: (res) => {
        this.LeavePlanSettings = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  addLeavePlan() {
    let modalRef = this.modalService.open(AddLeaveSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getLeavePlans()
    })
  }
  calanderView(){
    let modalRef = this.modalService.open(LeaveCalanderComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.LeavePlanSettings = this.LeavePlanSettings
    // modalRef.result.then(() => {
    //   this.getLeavePlans()
    // })
  }


  getAddPlan() {

    return !this.LeavePlanSettings.filter(x => x.leavePlanSettingStatus == 'APPROVED' || x.leavePlanSettingStatus == 'REQUESTED')[0]

  }

  getBadge(item: string) {
    if (item == 'REQUESTED') {
      return 'warning'
    }
    else if (item == 'REJECTED')
      return 'danger'
    else
      return 'success'
  }
  approve(leavePlanId:string) {

   

    this.confirmationService.confirm({
      message: 'Do you want to Approve this Employee Leave Plan?',
      header: 'Leave Plan Approval',
      icon: 'pi pi-info-circle',
      accept: () => {
        var leaveplan :LeavePlanSettingUpdateDto={
          id:leavePlanId,
          leavePlanSettingStatus:"APPROVED"
        }
        this.hrmService.updateEmployeeLeavePlan(leaveplan).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getLeavePlans()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });

  }
  goToRequestList() {
    throw new Error('Method not implemented.');
  }
  reject(leavePlanId:string) {

      this.ref = this.dialogService.open(CustomConfirmationComponent, { header: 'Leave Plan Rejection',
      
        data: {
          message: 'Do you want to Reject this Leave Plan Rejection ?',
        },
          width: '500px',
        closable: false,
        
      });
    
      this.ref.onClose.subscribe((result) => {
        if (result) {

          var leaveplan :LeavePlanSettingUpdateDto={
            id:leavePlanId,
            leavePlanSettingStatus:"REJECTED",
            rejectedremark:result

          }
         
          this.hrmService.updateEmployeeLeavePlan(leaveplan).subscribe({
                    next:(res)=>{
          
                      if(res.success){
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
                       this.getLeavePlans()
                      }
                      else{
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
                      }
                    }, error: (err) => {
            
                      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
            
               
                    }
                  })
    
  
  
  
        } else {
          // Handle reject action
          console.log('Leave Plan Rejection Cancelled');
        }
      });
  
  
    }

    roleMatch(value: string[]) {
      return this.userService.roleMatch(value)
    }

    filterChange(value: SelectList) {
      this.selected = value
      if (this.selected.id=='1') {
      this.getLeavePlans();

      }
      else {
      
        this.getEmployeeLeavePlans()
        //this.getResignation()
      }

  
    }
  }




