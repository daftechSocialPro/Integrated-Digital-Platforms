import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddClientDto, ClientsListDto } from 'src/app/model/Finance/IFinanceSettingDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FinanceService } from 'src/app/services/finance.service';
import { AddClientComponent } from './add-client/add-client.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements  OnInit  {
  submitted: boolean = false;
  cleintList: ClientsListDto[] = [];
 


  rowsPerPageOptions = [5, 10, 20];

  constructor(private finaceServie: FinanceService, private messageService: MessageService,
              private generalConfigService: ConfigurationService, private modalService: NgbModal) { }

  ngOnInit() {
      this.getclientList();

  }


  getclientList(){
    this.finaceServie.getclientList().subscribe({
      next: (res) => {
         this.cleintList = res;
      }
    });
  }




  openNew() {
    let modalRef = this.modalService.open(AddClientComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getclientList();
    })

    
  }

  editClient(client: ClientsListDto) {
    let modalRef = this.modalService.open(AddClientComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.client = client
    modalRef.result.then(() => {
      this.getclientList();
    });
  }



  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.cleintList.length; i++) {
          if (this.cleintList[i].id === id) {
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