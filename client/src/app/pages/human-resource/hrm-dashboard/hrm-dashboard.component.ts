import { Component, ElementRef, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { HrmDashboardGetDto } from 'src/app/model/HRM/IHrmDashboard';
import { HrmService } from 'src/app/services/hrm.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-hrm-dashboard',
  templateUrl: './hrm-dashboard.component.html',
  styleUrls: ['./hrm-dashboard.component.css']
})
export class HrmDashboardComponent implements OnInit {

  hrmDashboardData!: HrmDashboardGetDto
  pieChartOption!: EChartsOption;



  constructor(
    private elementRef: ElementRef,
    private hrmService: HrmService
    ) { }

  ngOnInit(): void {

    this.hrmService.getHrmDashboard().subscribe(
      (res) => {
        this.hrmDashboardData = res
        const chartdata = [
          {
          name: "Male",
          value: this.hrmDashboardData.maleEmployees
          },
          {
            name: "Female",
            value: this.hrmDashboardData.femaleEmployees
          }
       ]
       this.getPieChart(chartdata)
      }
    )
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  getPieChart(chartdata: any[]){
    this.pieChartOption = 

          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              //data: this.paymentStatusData.map(item => item.name)
            },
            series: [
              {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                
                label: {
                  show: false,
                  position: 'center',
                  formatter: '{b}: {c}' // Add the value placeholder {c}
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: chartdata,
                itemStyle: {
                  
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                }
              }
            ],
            toolbox: {
              feature: {
                saveAsImage: {},
                restore: {},
                dataView: {},
                print: {} // Add the print feature
              }
            }
          };
  }

}
