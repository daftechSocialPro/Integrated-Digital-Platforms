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
  barChartOption!: EChartsOption;



  constructor(
    private elementRef: ElementRef,
    private inventoryService: InventoryService
    ) { }

  ngOnInit(): void {

    this.inventoryService.getInventoryDashboard().subscribe(
      (res) => {
        this.inventoryDashboardData = res;
      
        this.barChartOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Purchase Request', 'Store Request'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Items',
              type: 'bar',
              barWidth: '60%',
              data: [this.inventoryDashboardData.pendingPurchaseRequest, this.inventoryDashboardData.pendingStoreRequest]
            }
          ]
        };
      }
    )
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
