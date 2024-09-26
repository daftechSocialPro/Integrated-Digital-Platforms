import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Table } from 'primeng/table/public_api';
import {
  AddPayeeDetailsDto,
  PayeeDetailListsDto,
  PaymentLetterDto,
} from 'src/app/model/Finance/IPaymentDto';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-payee-details',
  templateUrl: './add-payee-details.component.html',
  styleUrls: ['./add-payee-details.component.css'],
})
export class AddPayeeDetailsComponent implements OnInit {
  @Input() paymentId: string;
  payeeDetails: PayeeDetailListsDto[] = [];

  constructor(
    private financeService: FinanceService,
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getPayeeDetails();
  }

  getPayeeDetails() {
    this.financeService.getPayeeDetails(this.paymentId).subscribe({
      next: (res) => {
        this.payeeDetails = res;
      },
    });
  }
  addPaymentDetail(payee: AddPayeeDetailsDto) {
    // Validate the input before submitting

    if (payee.fullName && payee.accountNumber && payee.ammount > 0) {
      const newPayeeDetails: AddPayeeDetailsDto = {
        paymentId: this.paymentId,
        createdById: this.userService.getCurrentUser().userId, // Get current user ID
        fullName: payee.fullName,
        accountNumber: payee.accountNumber,
        ammount: payee.ammount,
        remark: payee.remark || '',
      };

      console.log(newPayeeDetails);

      this.financeService.addPayeeDetail(newPayeeDetails).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Added!',
            detail: 'Payee details added successfully',
          });
          this.getPayeeDetails(); // Refresh the list
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Occurred!',
            detail: 'Could not add payee details',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields',
      });
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  addNewRow() {
    const newPayee: PayeeDetailListsDto = {
      fullName: '',
      accountNumber: '',
      ammount: 0,
      remark: '',
      isEditable: true,
    };
    this.payeeDetails = [...this.payeeDetails, newPayee];
  }
  deleteConfirmation(detailId: string) {
    this.confirmationService.confirm({
      message: `Are You sure you want to delete Payee detail ?`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deletePayee(detailId);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  deletePayee(detailId: string) {
    this.financeService.RemovePayeeDetail(detailId).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully Deleted!',
          detail: 'Payee details deleted successfully',
        });
        this.getPayeeDetails();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Occurred!',
          detail: 'Could not delete payee details',
        });
      },
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
