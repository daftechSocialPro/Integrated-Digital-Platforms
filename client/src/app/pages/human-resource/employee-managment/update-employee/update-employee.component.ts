import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeGetDto, EmployeePostDto } from 'src/app/model/HRM/IEmployeeDto';
import { BankSelectList, SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() selectedEmployee !:EmployeeGetDto


  imagePath: any=null;
  EmployeeForm !: FormGroup;
  user !: UserView;
  departments!: SelectList[];
  positions!: SelectList[];
  countries !: SelectList[];
  regions!: SelectList[];
  zones ! : SelectList[];
  bankLists!: BankSelectList[];
  maxBirthDate: Date = new Date();
  maxHireDate: Date = new Date();
  bankDigit!: number ;

  fileGH! : File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private messageService : MessageService,
    private hrmService: HrmService,
    private configurationService: ConfigurationService,
    private commonService : CommonService,
    private dropService: DropDownService,
    private datePipe: DatePipe) {

   
  }

  ngOnInit(): void {
    this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
    this.user = this.userService.getCurrentUser();
   
    this.getCountries();
    this.getBankList();
    this.EmployeeForm = this.formBuilder.group({

      firstName: [this.selectedEmployee.firstName, Validators.required],
      middleName: [this.selectedEmployee.middleName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      amharicfirstName: [this.selectedEmployee.amharicFirstName, Validators.required],
      amharicmiddleName: [this.selectedEmployee.amharicMiddleName, Validators.required],
      amhariclastName: [this.selectedEmployee.amharicLastName, Validators.required],
      email: [this.selectedEmployee.email, Validators.required],
      phoneNumber: [this.selectedEmployee.phoneNumber, Validators.required],
      gender: [this.selectedEmployee.gender, Validators.required],
      birthDate: [new Date(this.selectedEmployee.birthDate), Validators.required],
      maritalStatus: [this.selectedEmployee.maritalStatus, Validators.required],
      employmentType: [this.selectedEmployee.employmentType, Validators.required],
      paymentType: [this.selectedEmployee.paymentType, Validators.required],
      employmentDate: [new Date(this.selectedEmployee.employmentDate), Validators.required],
      ContractEndDate: [this.selectedEmployee.contractEndDate],
      pensionCode: [this.selectedEmployee.pensionCode],
      tinNumber: [this.selectedEmployee.tinNumber],
      woreda: [this.selectedEmployee.woreda, Validators.required],
      countryId : [this.selectedEmployee.countryId],     
      regionId : [this.selectedEmployee.regionId],
      zoneId: [this.selectedEmployee.zoneId, Validators.required],
    })
    this.getRegions(this.selectedEmployee.countryId)
    this.getZones(this.selectedEmployee.regionId)
  }

 

 

  getCountries() {

    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res
      }
    })
  }

  getBankList(){
    this.dropService.getBankDropDowns().subscribe({
      next: (res) => {
        this.bankLists = res
      }
    });
  }

  getRegions(countryId: string) {

    this.dropService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.regions = res
      }
    });
  }

  getZones (regionId:string){
    this.dropService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res
      }
    });
  }


 

  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }


  changeDateTime(date: any){
       const changableDate = date ? new Date(date as string) : null;
     
       if (changableDate != null) {
        const convertedDate = this.datePipe.transform(changableDate, 'yyyy-MM-dd');
        return convertedDate as unknown as Date;
      }
      return null;
  }

  submit() {
    
    if (this.EmployeeForm.valid) {
      var employeePost: EmployeePostDto = {

        id: this.selectedEmployee.id,
        firstName: this.EmployeeForm.value.firstName,
        middleName: this.EmployeeForm.value.middleName,
        lastName: this.EmployeeForm.value.lastName,
        amharicFirstName: this.EmployeeForm.value.amharicfirstName,
        amharicMiddleName: this.EmployeeForm.value.amharicmiddleName,
        amharicLastName: this.EmployeeForm.value.amhariclastName,
        phoneNumber: this.EmployeeForm.value.phoneNumber,
        email: this.EmployeeForm.value.email,
        gender: this.EmployeeForm.value.gender,
        birthDate:this.changeDateTime(this.EmployeeForm.value.birthDate),
        maritalStatus: this.EmployeeForm.value.maritalStatus,
        employmentType: this.EmployeeForm.value.employmentType,
      
        paymentType: this.EmployeeForm.value.paymentType,
        employmentDate: this.changeDateTime(this.EmployeeForm.value.employmentDate),
        pensionCode: this.EmployeeForm.value.pensionCode.toString(),
        tinNumber: this.EmployeeForm.value.tinNumber.toString(),
        zoneId: this.EmployeeForm.value.zoneId,
        woreda: this.EmployeeForm.value.woreda,
        imagePath: this.fileGH,
        createdById: this.user.userId,
      }
      if(this.EmployeeForm.value.ContractEndDate){
        employeePost.ContractEndDate = this.changeDateTime(this.EmployeeForm.value.ContractEndDate);
      }

      var formData = new FormData();
      for (let key in employeePost) {
        if (employeePost.hasOwnProperty(key)) {
          formData.append(key, (employeePost as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('imagePath', this.fileGH);  

      this.hrmService.updateEmployee(formData).subscribe({
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
           
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
            
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        })
    }

  }
  closeModal() {
    this.activeModal.close()
  }

  getImage (url:string){

    return this.commonService.createImgPath(url)
  }
  getImage2() {

    if (this.imagePath != null) {
      return this.imagePath
    }
    if (this.selectedEmployee != null) {
      return this.getImage(this.selectedEmployee.imagePath!)
    }
    else {
      return 'assets/img/company.jpg'
    }
  }

  changeBankDigit(digitNumber: any){
    this.bankDigit =  Number(this.bankLists.find(X => X.id == digitNumber.value)?.bankDigit);
 }

}

