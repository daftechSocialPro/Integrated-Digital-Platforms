import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankListDto } from 'src/app/model/configuration/IBankListDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddBankListComponent } from './add-bank-list/add-bank-list.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  bankLists!: BankListDto[]

  ngOnInit(): void {
    this.getBankList()
  }

  constructor(private configService: ConfigurationService, private modalService: NgbModal) { }


  getBankList() {
    this.configService.getBankList().subscribe({
      next: (res) => {
        this.bankLists = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddBankListComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getBankList()
    })
  }

  update(bankList: BankListDto) {
    let modalRef = this.modalService.open(AddBankListComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.bank = bankList
    modalRef.result.then(() => {
      this.getBankList()
    })

  }

}