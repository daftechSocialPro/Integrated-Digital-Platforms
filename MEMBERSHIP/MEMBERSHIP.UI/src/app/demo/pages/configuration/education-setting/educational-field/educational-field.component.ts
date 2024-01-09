import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IEducationalFieldGetDto } from 'src/models/configuration/IEducationDto';
import { AddEducationalFieldComponent } from './add-educational-field/add-educational-field.component';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-educational-field',
  templateUrl: './educational-field.component.html',
  styleUrls: ['./educational-field.component.scss']
})
export class EducationalFieldComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  EducationalField:IEducationalFieldGetDto[];
  paginatedEducationalField : IEducationalFieldGetDto[];

  ngOnInit(): void {
    this.getEducationalFields()    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ConfigurationService){}


  getEducationalFields(){

    this.controlService.getEducationaslFields().subscribe({
      next:(res)=>{
        this.EducationalField = res 

        this.paginateEducationalField()
      }
    })
  }

  addEducationalField(){
 

    let modalRef = this.modalService.open(AddEducationalFieldComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getEducationalFields()
    })

  }

  removeEducationalField(EducationalFieldId:string) {

    console.log(EducationalFieldId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this EducationalField?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteEducationalField(EducationalFieldId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEducationalFields()
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

  
  updateEducationalField(EducationalField:IEducationalFieldGetDto){


    let modalRef = this.modalService.open(AddEducationalFieldComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.EducationalField=EducationalField

    modalRef.result.then(()=>{
      this.getEducationalFields()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateEducationalField();
  }

  
  paginateEducationalField() {
    this.paginatedEducationalField = this.EducationalField.slice(this.first, this.first + this.rows);
  }
}
