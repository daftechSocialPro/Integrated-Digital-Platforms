import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeGetDto, EmployeePostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
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

  fileGH! : File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private messageService : MessageService,
    private hrmService: HrmService,
    private configurationService: ConfigurationService,
    private commonService : CommonService) {

   
  }

  ngOnInit(): void {

    console.log(this.selectedEmployee.birthDate)
    this.user = this.userService.getCurrentUser();

    this.getCountries();
    this.EmployeeForm = this.formBuilder.group({

      firstName: [this.selectedEmployee.firstName, Validators.required],
      middleName: [this.selectedEmployee.middleName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      email: [this.selectedEmployee.email, Validators.required],
      phoneNumber: [this.selectedEmployee.phoneNumber, Validators.required],
      gender: [this.selectedEmployee.gender, Validators.required],
      birthDate: [this.selectedEmployee.birthDate.toString().split(' ')[0], Validators.required],
      maritalStatus: [this.selectedEmployee.maritalStatus, Validators.required],
      employmentType: [this.selectedEmployee.employmentType, Validators.required],
      paymentType: [this.selectedEmployee.paymentType, Validators.required],
      employmentDate: [this.selectedEmployee.employmentDate.toString().split(' ')[0], Validators.required],
      employmentStatus: [this.selectedEmployee.employmentStatus, Validators.required],
      contractEndDate: [this.selectedEmployee.contractEndDate],
      pensionCode: [this.selectedEmployee.pensionCode],
      tinNumber: [this.selectedEmployee.tinNumber],
      bankAccountNo: [this.selectedEmployee.bankAccountNo],
      woreda: [this.selectedEmployee.woreda, Validators.required],
      countryId : [this.selectedEmployee.countryId],
      regionId : [this.selectedEmployee.regionId],
      zoneId: [this.selectedEmployee.zoneId, Validators.required]


    })
    this.getRegions(this.selectedEmployee.countryId)
    this.getZones(this.selectedEmployee.regionId)
  }


  getCountries() {

    this.configurationService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res
      }
    })
  }

  getRegions(countryId: string) {

    this.configurationService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.regions = res
      }
    })
  }

  getZones (regionId:string){
    this.configurationService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res
      }
    })
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

  submit() {

    


    
    if (this.EmployeeForm.valid) {


      var employeePost: EmployeePostDto = {

        id: this.selectedEmployee.id,
        firstName: this.EmployeeForm.value.firstName,
        middleName: this.EmployeeForm.value.middleName,
        lastName: this.EmployeeForm.value.lastName,
        phoneNumber: this.EmployeeForm.value.phoneNumber,
        email: this.EmployeeForm.value.email,
        gender: this.EmployeeForm.value.gender,
        birthDate: this.EmployeeForm.value.birthDate,
        maritalStatus: this.EmployeeForm.value.maritalStatus,
        employmentType: this.EmployeeForm.value.employmentType,
        employmentStatus: this.EmployeeForm.value.employmentStatus,
        paymentType: this.EmployeeForm.value.paymentType,
        employmentDate: this.EmployeeForm.value.employmentDate,
        contractEndDate: this.EmployeeForm.value.contractEndDate,
        pensionCode: this.EmployeeForm.value.pensionCode.toString(),
        tinNumber: this.EmployeeForm.value.tinNumber.toString(),
        bankAccountNo: this.EmployeeForm.value.bankAccountNo.toString(),
     
       
        zoneId: this.EmployeeForm.value.zoneId,
        woreda: this.EmployeeForm.value.woreda,
        imagePath: this.fileGH,
        createdById: this.user.userId,

      }

      var formData = new FormData();
      for (let key in employeePost) {
        if (employeePost.hasOwnProperty(key)) {
          formData.append(key, (employeePost as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('imagePath', this.fileGH);
  

      this.hrmService.updateEmployee(formData).subscribe(
        {
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
        }
      )
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

}

