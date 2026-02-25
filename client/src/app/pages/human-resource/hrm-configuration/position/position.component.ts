import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionGetDto } from 'src/app/model/HRM/IPositionDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddPositionComponent } from './add-position/add-position.component';
import { UpdatePositionComponent } from './update-position/update-position.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  
  filterValue!:string
  positions! : PositionGetDto[]

  ngOnInit(): void {

    this.getPositions()
    
  }

  constructor (private hrmService : HrmService,private modalService:NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService){}


  getPositions (){
    this.hrmService.getPositions().subscribe({
      next:(res)=>{      
          this.positions = res       
      
      },error:(err)=>{
     
      }
    })
  }
  addPosition(){

    let modalRef = this.modalService.open(AddPositionComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getPositions()
    })
  }

  updatePosition (Position :PositionGetDto){


    let modalRef = this.modalService.open(UpdatePositionComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.Position = Position

    modalRef.result.then(()=>{

      this.getPositions()
    })

  }

  deletePosition(position: PositionGetDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this position?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deletePosition(position.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getPositions();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete position" });
          }
        });
      }
    });
  }

  get filteredPositions(): any[] {
    if (!this.filterValue) {
        return this.positions;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.positions.filter((department: any) => {
        const departmentName = department.positionName.toLowerCase();
        
        
        return departmentName.includes(filterText) ;
    });
  }

}
