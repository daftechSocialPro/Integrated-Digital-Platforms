import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApproveStoreRequest, RejectStoreRequest, StoreRequestItems, StoreRequestLists } from 'src/app/model/Inventory/StoreRequestDto';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-approve-store-request',
  templateUrl: './approve-store-request.component.html',
  styleUrls: ['./approve-store-request.component.css']
})
export class ApproveStoreRequestComponent implements OnInit {
 
  storeRequestList: StoreRequestItems[];
  approveRequest: ApproveStoreRequest = new ApproveStoreRequest();
  rejectRequest: RejectStoreRequest = new RejectStoreRequest();
 
  rejectDialog: boolean = false;
  approveDialog: boolean = false;
 
  editStoreRequest: StoreRequestLists = new StoreRequestLists();
  remainingQuantity: number = 0;
  storeApprovedQuantity: number = 0;
  submitted: boolean =false;
  storeRequestId: string;
 
 
 
 
 
  constructor(private dropDownServie: DropDownService, private inventoryService: InventoryService,
   private messageService: MessageService){}
 
 
   ngOnInit(): void {
     this.getStoreRequestList();
   }
 
 
   getStoreRequestList(){
     this.inventoryService.getPendingStoreRequests().subscribe({
       next: (res) =>{
         this.storeRequestList = res;
       }
     });
   }
 
 
   approveItems(item: StoreRequestLists, remainingQuantity: number,storeApprovedQuantity: number) {
     if (remainingQuantity < 0) {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There is No item in Store', life: 3000 });
     }
     else {
       this.approveDialog = true;
       this.remainingQuantity = remainingQuantity;
       this.storeApprovedQuantity = storeApprovedQuantity;
       this.editStoreRequest = { ...item }
     }
   }

   finalApproval(storeRequestId: string){
    this.inventoryService.finalApproveStoreRequest(storeRequestId).subscribe({
      next: (res) => {
         if(res.success){
          this.getStoreRequestList();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Approved Successfully', life: 3000 });
         }
         else{
          this.messageService.add({severity:'error',summary:'Error',detail: res.message})
         }
      },error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail: "Error Approving Quantity"})
      }
    });
   }
 
   rejectItem(stroreRequestId: string){
     this.rejectDialog = true;
     this.storeRequestId = stroreRequestId
   }
 
 
   hideDialog(){
     this.rejectDialog = this.approveDialog = false;
   }
 
   approveQuantity() {
     this.submitted = true;
     if(!this.approveRequest.approvedQuantity){
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the required fields', life: 3000 });
     }
     if((this.remainingQuantity - this.storeApprovedQuantity ) < this.approveRequest.approvedQuantity * this.editStoreRequest.toSIUnit){
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The approved Quantity is not in strore', life: 3000 });
     }
     else{
       this.approveRequest.id = this.editStoreRequest.id;
       this.inventoryService.approveStoreRequest(this.approveRequest).subscribe({
         next: (res) => {
            if(res.success){
             this.storeRequestList.map(x => {
               x.storeRequests =  x.storeRequests.filter(x => x.id != this.rejectRequest.id);
               
             });
             this.submitted = false;
             this.approveDialog = false;
             this.approveRequest = new ApproveStoreRequest();
             this.getStoreRequestList();
             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Approved Successfully', life: 3000 });
            }
            else{
             this.messageService.add({severity:'error',summary:'Error',detail: res.message})
            }
         },error: (err) => {
           this.messageService.add({severity:'error',summary:'Error',detail: "Error Approving Quantity"})
         }
       });
     }
   }
 
 
   SaveReject() {
     debugger;
     this.rejectRequest.id = this.storeRequestId;
     this.inventoryService.rejectStoreRequest(this.rejectRequest).subscribe({
       next: (res) => {
         if (res.success) {
          this.storeRequestList.map(x => {
             x.storeRequests =  x.storeRequests.filter(x => x.id != this.rejectRequest.id)
           });
           this.rejectDialog = false;
           this.rejectRequest = new RejectStoreRequest();
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Rejected Successfully', life: 3000 });
         }
         else {
           this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message })
         }
       }, error: (err) => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error Rejecting Quantity" })
       }
     });
   }
 
 }