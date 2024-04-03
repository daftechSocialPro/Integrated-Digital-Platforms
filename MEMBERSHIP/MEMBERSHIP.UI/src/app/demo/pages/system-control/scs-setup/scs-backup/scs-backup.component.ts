import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';

@Component({
  selector: 'app-scs-backup',
  templateUrl: './scs-backup.component.html',
  styleUrls: ['./scs-backup.component.scss']
})
export class ScsBackupComponent implements OnInit {

  backUpPath: string
  constructor(
    private messageService: MessageService,
    private maintainService: ScsSetupService) { }
  ngOnInit(): void {
    this.getDatabaseBackUp()

  }
  databases: string[] = [
    'DB_BUDGET',
    'DB_CUSTOMER',
    'DB_FINANCE',
    'DB_GENERAL',
    'DB_HUMAN',
    'DB_TECHNICAL'
  ];



  selectedDatabases: { [key: string]: boolean } = {};
  selectedDatabaseCount:number=0
  progress: number = 0;
  counter: number = 0;
  

  getDatabaseBackUp(){
    this.maintainService.getBackUpPath().subscribe({
      next:(res)=>{
        this.backUpPath = res.message
       
      }
    })
  }
  copyText() {
    // Copy the value to the clipboard
    navigator.clipboard.writeText(this.backUpPath);
    this.messageService.add({severity:'info',summary:'Successfull !!!',detail:'Successfully Copied to Clipboard '})
  }
  backupDatabase() {
    this.progress = 0 
    this.counter = 0 
    this.selectedDatabaseCount = Object.values(this.selectedDatabases).filter(value => value).length;

   

    if (this.selectedDatabaseCount==0) {
      // Handle the case where no database is selected
      this.messageService.add({ severity: 'error', summary: 'Something Went Wrong !!!', detail: "Please Select at least one database " })
      return;
    }
  

  
    for (const item in this.selectedDatabases) {


      this.maintainService.backUpDatabase(item, 'path').subscribe({
        next: (res) => {
          if (res.success) {
     
            this.messageService.add({ severity: 'success', summary: ` ${item} Successfully Backed up!!!`, detail: res.message })
            if(this.counter==this.selectedDatabaseCount){
            
            return
            }
            this.counter+=1
            this.progress = Number(((this.counter/this.selectedDatabaseCount)*100).toFixed(2))
          
          }
          else {
            this.messageService.add({ severity: 'error', summary: `Something Went Wrong on db ${item} !!!`, detail: res.message })

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: `Something Went Wrong on db ${item} !!!`, detail: err })

        }
      })

     

    }


  }


 


}
