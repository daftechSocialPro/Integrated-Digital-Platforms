import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApproveDisciplinaryCase, EmployeeDisciplinaryListDto } from 'src/app/model/HRM/IDisplinaryCaseDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { AddDisciplinaryCaseComponent } from './add-disciplinary-case/add-disciplinary-case.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';

@Component({
  selector: 'app-disciplinary-cases',
  templateUrl: './disciplinary-cases.component.html',
  styleUrls: ['./disciplinary-cases.component.css']
})
export class DisciplinaryCasesComponent implements OnInit {

  disciplinaryCase: EmployeeDisciplinaryListDto[] = [];
  user !: UserView

  constructor(private hrmService: HrmService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getDisplinaryCase();
  }

  getDisplinaryCase() {
    this.hrmService.getDisciplinaryCase().subscribe({
      next: (res) => {
        this.disciplinaryCase = res;
      }
    });
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  addDisplinary() {
    let modalRef = this.modalService.open(AddDisciplinaryCaseComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getDisplinaryCase()
    });
  }

  confirm(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Approve?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var approveCase: ApproveDisciplinaryCase = {
          approverId: this.user.employeeId,
          id: id
        };
        this.hrmService.approveDisciplinaryCase(approveCase).subscribe(
          {
            next: (res) => {
              if (res.success) {
                this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                this.getDisplinaryCase()
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

              }
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
            }
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
