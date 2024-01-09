import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { IEmployeeGetDto } from 'src/models/hrm/IEmployeeDto';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

@Input() employee: IEmployeeGetDto


  imagePath: any
  fileGH:File
  user !: UserView

  selectedState: any = null;
 
  EmployeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService:CommonService,
    private messageService: MessageService,
    private activeModal : NgbActiveModal,
    private hrmService: HrmService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.EmployeeForm = this.formBuilder.group({
      FirstName: [this.employee.employeeName.split(' ')[0], Validators.required],
      LastName: [this.employee.employeeName.split(' ')[1], Validators.required],
      Gender: [this.employee.gender, Validators.required],
      PhoneNumber: [this.employee.phoneNumber, Validators.required],
      BirthDate: [this.employee.birthDate, Validators.required],
      Email: [this.employee.email, Validators.required],
      Address: [this.employee.address, Validators.required],
      EmploymentDate: [(this.employee.employmentDate) , Validators.required],
      EmploymentPosition: [this.employee.employmentPosition, Validators.required],
      EmploymentStatus :[this.employee.employmentStatus,Validators.required]

    })
  }

  onSubmit() {

    console.log(this.EmployeeForm.value)
    if (this.EmployeeForm.valid) {

      const formData = new FormData();
      formData.append("Id",this.employee.id)
      formData.append("FirstName", this.EmployeeForm.value.FirstName);
      formData.append("LastName", this.EmployeeForm.value.LastName);
      formData.append("Gender", this.EmployeeForm.value.Gender);
      formData.append("PhoneNumber", this.EmployeeForm.value.PhoneNumber);
      formData.append("BirthDate", this.EmployeeForm.value.BirthDate);
      formData.append("Email", this.EmployeeForm.value.Email);
      formData.append("Address", this.EmployeeForm.value.Address);
      formData.append("EmploymentDate", this.EmployeeForm.value.EmploymentDate);
      formData.append("EmploymentPosition", this.EmployeeForm.value.EmploymentPosition);
      formData.append("Image", this.fileGH);
      formData.append("EmploymentStatus", this.EmployeeForm.value.EmploymentStatus);


      this.hrmService.updateEmployee(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.EmployeeForm.reset();
          
            this.closeModal()
           
         
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })



    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Form Submit failed.', detail: "Please fil required inputs !!" });
    }


  }
  onUpload(event: any) {

    debugger
    var file: File = event.target.files[0];
    
    this.fileGH = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  getImage(url:string){
    return this.commonService.createImgPath(url)
  }

  getImage2() {
    

    if (this.imagePath != null) {
      return this.imagePath
    }
    if (this.employee.imagePath != "") {
     
      return this.getImage(this.employee.imagePath!)
    }
    else {
      return 'assets/images/profile.jpg'
    }
  }

  closeModal(){

    this.activeModal.close()
  }
}