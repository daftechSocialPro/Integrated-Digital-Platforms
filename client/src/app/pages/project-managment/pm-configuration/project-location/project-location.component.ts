import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectLocationGetDto } from 'src/app/model/PM/ProjectLocationDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddProjectLocationComponent } from './add-project-location/add-project-location.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-location',
  templateUrl: './project-location.component.html',
  styleUrls: ['./project-location.component.css']
})
export class ProjectLocationComponent implements OnInit {

  projectLocations: ProjectLocationGetDto[] = [];

  constructor(
    private configurationService: ConfigurationService,
    private commonService: CommonService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    this.getProjectLocations();
  }


  getProjectLocations() {
    this.configurationService.getProjectLocations().subscribe({
      next: (res) => {
        this.projectLocations = res
        console.log(res)
      }, error: (err) => {


      }
    })
  }

  addProjectLocation() {

    let modalRef = this.modalService.open(AddProjectLocationComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.calledFrom = 0 
    modalRef.result.then((res) => {
      this.getProjectLocations()
    })

  }

  updateProjectLocation(projectLocation: ProjectLocationGetDto) {

    let modalRef = this.modalService.open(AddProjectLocationComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.projectLocation = projectLocation
    modalRef.componentInstance.calledFrom = 0 

    modalRef.result.then((res) => {
      this.getProjectLocations();
    })
  }
  deleteProjectLocation(locationId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Remove this Project Location?',
      header: 'Delete Confirmation!!',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.configurationService.deleteProjectLocation(locationId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getProjectLocations()
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

}
