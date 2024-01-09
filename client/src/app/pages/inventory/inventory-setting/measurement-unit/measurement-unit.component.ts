import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MeasurementUnitDto } from 'src/app/model/Inventory/MeasurementUnit.Model';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddMeasurementunitComponent } from './add-measurementunit/add-measurementunit.component';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.css']
})
export class MeasurementUnitComponent implements OnInit  {
  submitted: boolean = false;
  popupDialog: boolean = false;
  measurementList: MeasurementUnitDto[] = [];
  measurmentType: any[] = [
    { value: 0, name: "LENGTH" },
    { value: 1, name: "MASS" },
    { value: 2, name: "VOLUME" },
    { value: 3, name: "PIECE" },
  ];



  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventoryService: InventoryService, 
              private messageService: MessageService,
              private modalService:NgbModal) { }

  ngOnInit() {
     this.getMeasurementUnit()
  }

  getMeasurementUnit(){
    this.inventoryService.getMeasurementUnit().subscribe({
      next: (res) => {
         this.measurementList = res;
      }
    });
  }


  openNew() {
    let modalRef = this.modalService.open(AddMeasurementunitComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getMeasurementUnit();
    });
  }

  editMeasurement(measurementUnit: MeasurementUnitDto) {
    let modalRef = this.modalService.open(AddMeasurementunitComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.measurementUnit = measurementUnit
    modalRef.result.then(() => {
      this.getMeasurementUnit();
    });
  }


  hideDialog() {
      this.popupDialog = false;
  }

 

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.measurementList.length; i++) {
          if (this.measurementList[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
