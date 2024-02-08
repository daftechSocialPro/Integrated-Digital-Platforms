import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { IRegionRevenueDto } from 'src/models/configuration/IMembershipDto';
import {  EChartsOption } from 'echarts';

@Component({
  selector: 'app-total-revenue',
  templateUrl: './total-revenue.component.html',
  styleUrls: ['./total-revenue.component.scss']
})
export class TotalRevenueComponent implements OnInit {
  chartData: any[];

  reportRevenues: IRegionRevenueDto[]
  regionRevenueSum: number = 0
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  chartOption:EChartsOption 

  ngOnInit(): void {
    this.getRevenueReport()


  




  }
  constructor(private memberService: MemberService) { }


  getRevenueReport() {

    this.memberService.GetRegionReportRevenue().subscribe({
      next: (res) => {
        this.reportRevenues = res
        this.reportRevenues.map((item) => {
          console.log(item.regionRevenue)
          this.regionRevenueSum += item.regionRevenue
        }
        )
        this.chartOption = {
          color: ['#3398DB'], // Set a custom color for the bars
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.reportRevenues.map(item => item.regionName),
            axisLabel: {
              
                color: '#666' // Set the x-axis label text color
              
            },
            axisLine: {
              lineStyle: {
                color: '#ccc' // Set the x-axis line color
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
           
                color: '#666' // Set the y-axis label text color
              
            },
            axisLine: {
              lineStyle: {
                color: '#ccc' // Set the y-axis line color
              }
            },
            splitLine: {
              lineStyle: {
                color: '#ccc' // Set the color of the horizontal grid lines
              }
            }
          },
          series: [
            {
              data: this.reportRevenues.map(item => item.regionRevenue),
              type: 'bar',
              barWidth: '60%', // Adjust the width of the bars
              itemStyle: {
              
                shadowBlur: 10,
                shadowOffsetY: 5,
                shadowColor: 'rgba(0, 0, 0, 0.1)' // Add a subtle shadow effect to the bars
              }
            }
          ]
        };

        
        
    
      }
    })
  }


  exportAsExcel(name: string) {

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

}
