import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CssCustomerService } from 'src/app/services/customer-service/css-customer.service';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ScsMaintainService } from 'src/app/services/system-control/scs-maintain.service';
import { ICustomerDto, ICustomerPostDto } from 'src/models/customer-service/ICustomerDto';
import { IMobileUsersDto } from 'src/models/dwm/IMobileUsersDto';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';
import { IBillEmpDutiesDto } from 'src/models/system-control/IBillEmpDutiesDto';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { IKebelesDto } from 'src/models/system-control/IKebelesDto';
import { IKetenaDto } from 'src/models/system-control/IKetenaDto';
import { IMeterSizeDto } from 'src/models/system-control/IMeterSizeDto';

@Component({
  selector: 'app-add-css-customer',
  templateUrl: './add-css-customer.component.html',
  styleUrls: ['./add-css-customer.component.scss']
})
export class AddCssCustomerComponent implements OnInit {

  customerForm!: FormGroup;

  ketenas: IKetenaDto[]
  kebeles: IKebelesDto[]
  villages: IGeneralSettingDto[]

  billDuties: IBillEmpDutiesDto[]
  onlineSalesGroups: any

  readers: IMobileUsersDto[]
  swerages: any

  billCycles: IGeneralSettingDto[]
  customerCategories: ICustomerCategoryDto[]
  meterSizes: IMeterSizeDto[]

  months: IFiscalMonthDto[]

  @Input() contractNo: string
  Customer: ICustomerDto
  CustomerForm!: FormGroup;
 
  ketena: IKetenaDto[]
  kebele: IKebelesDto[]
  village: IGeneralSettingDto[]
  billCycle: IGeneralSettingDto[]
  meterSize: IMeterSizeDto[]
  meterType: IGeneralSettingDto[]
  meterDigit: IGeneralSettingDto[]
  countryOrgin: IGeneralSettingDto[]
  meterModel: IGeneralSettingDto[]
  meterClass:IGeneralSettingDto[]
  waterSource: IGeneralSettingDto[]
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private controlService: ScsDataService,
    private dwmService: DWMService,
    private maintainService: ScsMaintainService,
    private customerService: CssCustomerService,
    private messageService: MessageService
  ) {
    this.customerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      ketena: ['', Validators.required],
      readerName: ['', Validators.required],
      kebele: ['', Validators.required],
      village: ['', Validators.required],
      mapNumber: ['', Validators.required],
      houseNumber: ['', Validators.required],
      billCycle: ['', Validators.required],
      customerCategory: ['', Validators.required],
      contractNo: ['', Validators.required],
      ordinaryNo: ['', Validators.required],
      meterNo: ['', Validators.required],
      meterSize: ['', Validators.required],
      installationDate: ['', Validators.required],
      updateInitial: [false, Validators.required],
      startReading: ['', Validators.required],
      sweragePaid: ['', Validators.required],
      monhtIndex:['',Validators.required],
      fiscalYear:['',Validators.required]
    })
  }





  ngOnInit(): void {

    this.getKebeles()
    this.getKetenas()
    this.getVillages()
    this.getBillCycles()
    this.getCustomerCategoriess()
    this.getMeterSizes()
    this.getMobileUsers()
    this.getBillDuties()
    this.getMonths()

  }

  getMonths(){
    this.controlService.getFiscalMonth().subscribe({
      next:(res)=>{
        this.months  = res 
      }
    })
  }
  getKetenas() {
    this.controlService.getKetena().subscribe({
      next: (res) => {
        this.ketenas = res
      }
    })
  }

  getKebeles() {
    this.controlService.getKebeles().subscribe({
      next: (res) => {
        this.kebeles = res
      }
    })
  }

  getVillages() {

    this.controlService.getGeneralSetting("Village").subscribe({
      next: (res) => {
        this.villages = res
      }
    })
  }

  getBillCycles() {

    this.controlService.getGeneralSetting("BOOK NUMBER").subscribe({
      next: (res) => {
        this.billCycles = res
      }
    })
  }
  getCustomerCategoriess() {

    this.controlService.getCustomerCategory().subscribe({
      next: (res) => {
        this.customerCategories = res

      }
    })
  }
  getMeterSizes() {

    this.controlService.getMeterSize().subscribe({
      next: (res) => {
        this.meterSizes = res

      }
    })
  }
  getMobileUsers() {

    this.dwmService.getMobileUsers().subscribe({
      next: (res) => {
        this.readers = res

      }
    })

  }

  getBillDuties() {

    this.maintainService.getBillEmpDuties().subscribe({
      next: (res) => {
        this.billDuties = res
      }
    })

  }

  closeModal() {

    this.activeModal.close()

  }

  submit() {

    var customerPost: ICustomerPostDto = {
      fullName: this.customerForm.value.fullName,
      phoneNumber: this.customerForm.value.phoneNumber,
      ketena: this.customerForm.value.ketena,
      kebele: this.customerForm.value.kebele,
      readerName: this.customerForm.value.readerName,
      village: this.customerForm.value.village,
      mapNumber: this.customerForm.value.mapNumber,
      houseNumber: this.customerForm.value.houseNumber,
      billCycle: this.customerForm.value.billCycle,
      customerCategory: this.customerForm.value.customerCategory,
      contractNo: this.customerForm.value.contractNo,
      ordinaryNo: this.customerForm.value.ordinaryNo,
      meterNo: this.customerForm.value.meterNo,
      meterSize: this.customerForm.value.meterSize,
      installationDate: this.customerForm.value.installationDate,
      updateInitial: this.customerForm.value.updateInitial,
      startReading: this.customerForm.value.startReading,
      sweragePaid: this.customerForm.value.sweragePaid,
      monthIndex :this.customerForm.value.monhtIndex,
      fiscalYear:this.customerForm.value.fiscalYear
    }

    this.customerService.createCustomer(customerPost).subscribe({
      next: (res) => {
        if (res.success) {

          this.messageService.add({ severity: 'success', summary: 'Successfully Added !!!', detail: res.message })
          this.closeModal()

        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong !!!', detail: res.message })


        }

      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong !!!', detail: err })

      }
    })

  }
}
