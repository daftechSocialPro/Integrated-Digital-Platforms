import { Component, ElementRef, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { InventoryDashboardGetDto } from 'src/app/model/Inventory/IInventoryDashboardDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrls: ['./inventory-dashboard.component.css']
})
export class InventoryDashboardComponent implements OnInit {

  inventoryDashboardData!: InventoryDashboardGetDto
  pieChartOption!: EChartsOption;



  constructor(
    private elementRef: ElementRef,
    private inventoryService: InventoryService
    ) { }

  ngOnInit(): void {

    this.inventoryService.getInventoryDashboard().subscribe(
      (res) => {
        this.inventoryDashboardData = res;
      }
    )
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
