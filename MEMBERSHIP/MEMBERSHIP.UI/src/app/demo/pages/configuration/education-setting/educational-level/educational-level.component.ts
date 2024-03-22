import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IEducationalLevelGetDto } from 'src/models/configuration/IEducationDto';
import { AddEducationalLevelComponent } from './add-educational-level/add-educational-level.component';
import { UserView } from 'src/models/auth/userDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-educational-level',
  templateUrl: './educational-level.component.html',
  styleUrls: ['./educational-level.component.scss']
})
export class EducationalLevelComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  EducationalLevel:IEducationalLevelGetDto[];
  paginatedEducationalLevel : IEducationalLevelGetDto[];

  userView: UserView

  ngOnInit(): void {
    this.getEducationalLevels()  
    this.userView = this.userService.getCurrentUser()  
  }

  constructor(
    private modalService : NgbModal,
    private userService : UserService,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ConfigurationService){}


  getEducationalLevels(){

    this.controlService.getEducationaslLevels().subscribe({
      next:(res)=>{
        this.EducationalLevel = res 

        this.paginateEducationalLevel()
      }
    })
  }

  addEducationalLevel(){


    let modalRef = this.modalService.open(AddEducationalLevelComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getEducationalLevels()
    })

  }

  removeEducationalLevel(EducationalLevelId:string) {

    console.log(EducationalLevelId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this EducationalLevel?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteEducationalLevel(EducationalLevelId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEducationalLevels()
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

  
  updateEducationalLevel(EducationalLevel:IEducationalLevelGetDto){


    let modalRef = this.modalService.open(AddEducationalLevelComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.EducationalLevel=EducationalLevel

    modalRef.result.then(()=>{
      this.getEducationalLevels()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateEducationalLevel();
  }

  
  paginateEducationalLevel() {
    this.paginatedEducationalLevel = this.EducationalLevel.slice(this.first, this.first + this.rows);
  }
}

