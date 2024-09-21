import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PayeeDetailListsDto } from 'src/app/model/Finance/IPaymentDto';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-payee-details',
  templateUrl: './add-payee-details.component.html',
  styleUrls: ['./add-payee-details.component.css']
})
export class AddPayeeDetailsComponent implements OnInit {

  @Input() paymentId: string; 
  payeeDetails: PayeeDetailListsDto[] = [];

  constructor(  private financeService: FinanceService,
    private routerService: Router,
    private userService: UserService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private modalService: NgbModal){ }

  ngOnInit(): void {
    this.getPayeeDetails();
  }


  getPayeeDetails(){
    this.financeService.getPayeeDetails(this.paymentId).subscribe({
      next: (res) => {
        this.payeeDetails = res
      }
    })
  }

   
}
