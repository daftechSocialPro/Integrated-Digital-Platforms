import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddPerformaDto, ApprovePerformaDto, ApprovedPurchaseRequestsDto } from 'src/app/model/Inventory/PurchaseRequestDto';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-approved-purchase-requests',
  templateUrl: './approved-purchase-requests.component.html',
  styleUrls: ['./approved-purchase-requests.component.css']
})
export class ApprovedPurchaseRequestsComponent implements OnInit {

  approvedList: ApprovedPurchaseRequestsDto[];
  addPerformas: AddPerformaDto = new AddPerformaDto();
  vendorDropDown: SelectList[] = [];
  candidateVendors: SelectList[] = []
  approvePerforma: ApprovePerformaDto = new ApprovePerformaDto();


  performaDialog: boolean = false;
  winnerDialog: boolean = false;

  constructor(private dropDownService: DropDownService, private inventoryService: InventoryService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getVendordropDown();
    this.getApprovedItemsList();
  }


  getApprovedItemsList() {
    this.inventoryService.getApproveItems().subscribe({
      next: (res) => {
        this.approvedList = res;
      }
    });
  }

  getVendordropDown() {
    this.dropDownService.getVendorDropDown().subscribe({
      next: (res) => {
        this.vendorDropDown = res;
      }
    });
  }


  addPerforma(requestId: string) {
    this.addPerformas.purchaseRequestListId = requestId;
    this.performaDialog = true;
  }


  addRequestPerforma() {
    this.inventoryService.AddPerforma(this.addPerformas).subscribe({
      next: (res) => {
        if (res.success) {
          this.getApprovedItemsList();
          this.hideDialog();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error Adding Performa" })
      }
    })
  }


  hideDialog() {
    this.performaDialog = false;
    this.addPerformas = new AddPerformaDto();
  }


  selectWinner(requestId: string){
    this.winnerDialog = true;
    this.dropDownService.getVendorDropDownByrequestId(requestId).subscribe({
      next: (res) => {
        this.candidateVendors = res;
      }
    });
    this.approvePerforma.purchaseRequestListId = requestId;
  }

  SaveWinner(){
    this.inventoryService.approveFinalRequest(this.approvePerforma).subscribe({
      next: (res) => {
        if (res.success) {
          this.getApprovedItemsList();
          this.hideDialog();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error Adding Performa" })
      }
    })
  }

}