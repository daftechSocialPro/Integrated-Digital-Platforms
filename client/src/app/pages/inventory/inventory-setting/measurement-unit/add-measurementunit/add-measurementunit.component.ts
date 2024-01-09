import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { MeasurementListDto, MeasurementUnitDto } from 'src/app/model/Inventory/MeasurementUnit.Model';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-measurementunit',
  templateUrl: './add-measurementunit.component.html',
  styleUrls: ['./add-measurementunit.component.css']
})

export class AddMeasurementunitComponent implements OnInit{
  @Input() measurementUnit :MeasurementListDto;
  measurementType: any[] = [
    { value: 0, name: "LENGTH" },
    { value: 1, name: "MASS" },
    { value:  2, name: "VOLUME" },
    { value: 3, name: "PIECE" },
  ]
 
  addMeasurement: MeasurementUnitDto = new MeasurementUnitDto();
  constructor(private inventoryService: InventoryService,
             private messageService: MessageService,
             private activeModal: NgbActiveModal){

  }
 
  ngOnInit(): void {
    if (this.measurementUnit.id) {
      this.addMeasurement = {
        id: this.measurementUnit.id,
        name: this.measurementUnit.name,
        amharicName: this.measurementUnit.amharicName,
        measurementType: this.measurementType.find(x => x.name == this.measurementUnit.measurementType).value,
        toSIUnit: this.measurementUnit.toSIUnit
      };
    }
  }


  saveMeasurement() {
    if (this.addMeasurement.id) {
      this.inventoryService.updateMeasurement(this.addMeasurement).subscribe({
        next: (res) => {
          if(res.success){
        
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated', life: 3000 });
            this.closeModal();
        }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
          }
        },error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
     
    }
    else {
      this.inventoryService.addMeasurement(this.addMeasurement).subscribe({
        next: (res) => {
          if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Created', life: 3000 });
          this.closeModal();
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
        },error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
    }
  }

  closeModal(){
    this.activeModal.close();
    this.addMeasurement = new MeasurementUnitDto();
  }

}