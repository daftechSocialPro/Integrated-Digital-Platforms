import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {


  imagePath: any
  fileGH:File
  user !: UserView

  selectedState: any = null;
 
  EmployeeForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private activeModal : NgbActiveModal,
    private hrmService: HrmService) { }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser()

    this.EmployeeForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Gender: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      BirthDate: [null, Validators.required],
      Email: [null, Validators.required],
      Address: ['', Validators.required],
      EmploymentDate: ['', Validators.required],
      EmploymentPosition: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.EmployeeForm.valid) {

      const formData = new FormData();
      formData.append("FirstName", this.EmployeeForm.value.FirstName);
      formData.append("LastName", this.EmployeeForm.value.LastName);
      formData.append("Gender", this.EmployeeForm.value.Gender);
      formData.append("PhoneNumber", this.EmployeeForm.value.PhoneNumber);
      formData.append("BirthDate", this.EmployeeForm.value.BirthDate);
      formData.append("Email", this.EmployeeForm.value.Email);
      formData.append("Address", this.EmployeeForm.value.Address);
      formData.append("EmploymentDate", this.EmployeeForm.value.EmploymentDate);
      formData.append("EmploymentPosition", this.EmployeeForm.value.EmploymentPosition);
      formData.append("ImagePath", this.fileGH);
      formData.append("CreatedById", this.user.userId);

      this.hrmService.addEmployee(formData).subscribe({
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

    var file: File = event.target.files[0];
    this.fileGH = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  closeModal(){

    this.activeModal.close()
  }

  
}
