import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IMobileAppReadingDto } from 'src/models/dwm/IMobileAppReadingDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-dwm-reading-sheet',
  templateUrl: './dwm-reading-sheet.component.html',
  styleUrls: ['./dwm-reading-sheet.component.scss']
})
export class DwmReadingSheetComponent implements OnInit {

readingLength : number 
search:string=""

pageNumber : number = 1 
pageSize : number = 10 

first:number=1


year : string=null
month : string =null
kebele : string =''

months :IFiscalMonthDto[]=[]

mobileReadings : IMobileAppReadingDto[]=[]

  ngOnInit(): void {
    this.getReadingLength()
    this.getGeneratedCustomers()
    this.getMonths()
  }


  constructor(
    private messageService:MessageService,
    private scsService:ScsDataService,
    private dwmService:DWMService){

  }

  getMonths (){
    this.scsService.getFiscalMonth().subscribe({
      next:(res)=>{
        this.months= res
      }
    })
  }

  ClearMobileAppReading(){

    this.dwmService.ClearScript().subscribe({

      next:(res)=>{

        if (res.success){

          this.messageService.add({severity:'success',summary:'Successfully Cleared Script !!',detail:res.message})

          this.getReadingLength();
          this.getGeneratedCustomers()
        }else{
          this.messageService.add({severity:'error',summary:'Something Went Wrong !!! ',detail:res.message})
        }
      },error:(err)=>{
        this.messageService.add({severity:'error',summary:'Something Went Wrong !!! ',detail:err.message})
      }

    })

  }

  getReadingLength (){
    this.dwmService.getMobilReaderLength().subscribe({
      next:(res)=>{
        this.readingLength = res
      }
    })
  }

  getGeneratedCustomers(){

    this.dwmService.GetMobileReadings(this.pageNumber,this.pageSize).subscribe({

      next:(res)=>{

        console.log(res)
        this.mobileReadings = res 
      }

    })
  }

  generateCustomers(){

    this.dwmService.InsertMobileAppReading(this.year,this.month,this.kebele).subscribe({
      next:(res)=>{
        if(res.success){
          this.messageService.add({severity:'success',summary:'Successfully Generated!!!',detail:res.message})
          this.year=''
          this.month=''
          this.getGeneratedCustomers()
          this.getReadingLength()
        }

        else{
          this.messageService.add({severity:'error',summary:'Something went wrong!!!',detail:res.message})
        }
        }

      ,error:(err)=>{
        this.messageService.add({severity:'error',summary:'',detail:err.message})
      }
    })
  }

  onPageChange(even:any){

    this.first = even.first
    this.pageNumber = even.page +1
    this.pageSize = even.rows

    this.getGeneratedCustomers()
    console.log(even)

  }
}
