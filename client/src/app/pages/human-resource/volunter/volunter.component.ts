import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { VolunterGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { AddVolunterComponent } from './add-volunter/add-volunter.component';

@Component({
  selector: 'app-volunter',
  templateUrl: './volunter.component.html',
  styleUrls: ['./volunter.component.css']
})
export class VolunterComponent implements OnInit {

  volunters!: VolunterGetDto[]
  ngOnInit(): void {

    this.getvolunters()
  }
  constructor(
    private hrmService: HrmService, 
    private router : Router,
    private commmonService : CommonService,
    private modalService: NgbModal) {



  }

  getvolunters() {

    this.hrmService.getVolunters().subscribe({
      next: (res) => {
        this.volunters = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addvolunter() {

    let modalRef = this.modalService.open(AddVolunterComponent, { size: 'xl', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getvolunters()
    })
  }

  volunterDetail (volunterId: string ){
    this.router.navigate(['HRM/volunterDetail',{volunterId:volunterId}])
  }

  getImagePath(url:string){
     return this.commmonService.createImgPath(url)
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
