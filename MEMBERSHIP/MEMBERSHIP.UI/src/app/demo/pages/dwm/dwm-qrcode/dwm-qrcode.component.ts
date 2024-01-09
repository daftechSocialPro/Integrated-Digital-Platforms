import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CssCustomerService } from 'src/app/services/customer-service/css-customer.service';
import { ICustomerDto } from 'src/models/customer-service/ICustomerDto';
import { AddCssCustomerComponent } from '../../customer-service/css-customer/add-css-customer/add-css-customer.component';
import { CssImportComponent } from '../../customer-service/css-customer/css-import/css-import.component';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { IQRCodeDto } from 'src/models/dwm/IQRCodeDto';


@Component({
  selector: 'app-dwm-qrcode',
  templateUrl: './dwm-qrcode.component.html',
  styleUrls: ['./dwm-qrcode.component.scss']
})
export class DwmQrcodeComponent implements OnInit {
  Customer:ICustomerDto[]

  displaySelectOption: boolean = false;
  selectedOption: string = '';
  
  filterdInterface:ICustomerDto[]=[]
  totlRecords:number =0
  searchText: string = '';
  first: number = 0;
  rows: number = 5;
  selectedItems:ICustomerDto[]

  generatedImage :string 
  paginationCustomer:ICustomerDto[]=[];

  selectAll: boolean = false;

// Method to select or deselect all items

  constructor(private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private dwmService:DWMService,
    private controlService:CssCustomerService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getCustomers()

  }
  
  selectAllItems() {
    for (let item of this.paginationCustomer) {
      item.selected = this.selectAll;
    }
  }
  
  filterInterfaces() {
    if (this.searchText.trim() === '') {
      this.filterdInterface = this.Customer;
    } else {
      this.filterdInterface = this.Customer.filter((item) =>
        item.customerName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.first=0;
    this.onPageChange({first:this.first,rows:this.rows},this.filterdInterface)
  }
  

  getCustomers(){

    this.controlService.getCustomer().subscribe({
      next:(res)=>{
        this.Customer = res 
        this.paginatedCustomer(this.Customer)
       }
    })
  }

  addcustomer(){

    let modalRef = this.modalService.open(AddCssCustomerComponent,  {size:'lg',backdrop:'static', windowClass: 'custom-modal-width'})

    modalRef.result.then(()=>{
    })
  }


  showSelectOption() {
    this.displaySelectOption = true;
  }

  handleOptionSelection() {
    if (this.selectedOption === 'button') {
      this.addcustomer();
    } else {
    }
  }


  cssImport(){
    let modalRef = this.modalService.open(CssImportComponent,  {size:'lg',backdrop:'static',  })

    modalRef.result.then(()=>{
    })

  }
  onPageChange(event: any,gInterface?:ICustomerDto[] ) {
    this.first = event.first;
    this.rows = event.rows;
    if(gInterface){
      this.paginatedCustomer(gInterface)
    }else{
    this.paginatedCustomer(this.Customer);
    }
  }
  paginatedCustomer(ginterfces:ICustomerDto[]) {
    this.totlRecords =ginterfces.length
    this.paginationCustomer= ginterfces.slice(this.first, this.first + this.rows);
  }



  generateQrCode (){
    this.selectedItems = this.paginationCustomer.filter(item => item.selected);
    console.log(this.selectedItems)
    
  if (this.selectedItems.length === 0) {
    this.messageService.add({severity:'error',summary:'No Customer Selected',detail:'Please select a customer!!!'})
    return ;
  }
  const qrDatas: IQRCodeDto[] = this.selectedItems.map((item) => {
    const qrCodeDto: IQRCodeDto = {
      CustomerName: item.customerName,
      CustId :item.custId
      // Add other properties as needed
    };
    return qrCodeDto;
  });

  

    this.dwmService.generateQRCode(qrDatas).subscribe({
      next:(res)=>{

        this.messageService.add({severity:'success',summary:'Successfully generated Qr codes',detail:'Please check the pdf files !!!'})
        
        const blob = new Blob([res], { type: 'application/pdf' });

        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);
  
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr_codes.pdf';
  
        // Programmatically click the link to initiate the download
        link.click();
  
        // Clean up the URL object

       
      }
    })



  }


  getImage(custId:string, customerName : string ){

    return 

  }
}
