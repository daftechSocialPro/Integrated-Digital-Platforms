import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { EmployeePostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

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
    private dropService: DropDownService) {

    this.EmployeeForm = this.formBuilder.group({

      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null, Validators.required],
      birthDate: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      employmentType: [null, Validators.required],
      paymentType: [null, Validators.required],
      employmentDate: [null, Validators.required],
      employmentStatus: [null, Validators.required],
      departmentId: [null, Validators.required],
      positionId: [null, Validators.required],
      contractDays: [0],
      pensionCode: [''],
      tinNumber: [''],
      bankAccountNo: [''],
      woreda: [null, Validators.required],
      zoneId: [null, Validators.required]


    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getDepartments();
    this.getPositions();
    this.getCountries();
  }


  getCountries() {

    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res
      }
    })
  }

  getRegions(countryId: string) {

    this.dropService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.regions = res
      }
    })
  }

  getZones (regionId:string){
    this.dropService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res
      }
    })
  }


  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res

      }
    })
  }



  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
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

    
    if (this.imagePath === null) {
     
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'Image File not Selected' });         
      return;
    }

    
    if (this.EmployeeForm.valid) {


      var employeePost: EmployeePostDto = {

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
        contractDays: this.EmployeeForm.value.contractDays,
        pensionCode: this.EmployeeForm.value.pensionCode.toString(),
        tinNumber: this.EmployeeForm.value.tinNumber.toString(),
        bankAccountNo: this.EmployeeForm.value.bankAccountNo.toString(),
        departmentId: this.EmployeeForm.value.departmentId,
        positionId: this.EmployeeForm.value.positionId,
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
  

      this.hrmService.addEmployee(formData).subscribe(
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

}
