import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionGetDto } from 'src/app/model/HRM/IPositionDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddPositionComponent } from './add-position/add-position.component';
import { UpdatePositionComponent } from './update-position/update-position.component';

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

  constructor (private hrmService : HrmService,private modalService:NgbModal){}


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
