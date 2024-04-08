import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { UserService } from 'src/app/services/user.service';
import { IMobileUsersDto } from 'src/models/dwm/IMobileUsersDto';

@Component({
  selector: 'app-add-mobile-users',
  templateUrl: './add-mobile-users.component.html',
  styleUrls: ['./add-mobile-users.component.scss']
})
export class AddMobileUsersComponent implements OnInit {

  imagePath: any
  fileGH: File
  selectedState: any = null;
  EmployeeForm!: FormGroup;

  @Input() mobileUser: IMobileUsersDto

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal,
    private dwmService: DWMService,
    private commonService:CommonService
  ) { }

  ngOnInit(): void {

    if (this.mobileUser) {

      this.EmployeeForm = this.formBuilder.group({
        userName: [this.mobileUser.userName, Validators.required],
        password: [this.mobileUser.passWord, Validators.required],
        fullname: [this.mobileUser.fullName, Validators.required],
        phone: [this.mobileUser.phone, Validators.required],
        imei1: [this.mobileUser.imei1, Validators.required],
        imei2: [this.mobileUser.imei2, Validators.required],
        role: [this.mobileUser.role, Validators.required],

      })
    }
    else {

      this.EmployeeForm = this.formBuilder.group({
        userName: [null, Validators.required],
        password: [null, Validators.required],
        fullname: [null, Validators.required],
        phone: [null, Validators.required],
        imei1: [null, Validators.required],
        imei2: [null, Validators.required],
        role: [null, Validators.required],

      })

    }



  }

  onSubmit() {

    if (this.EmployeeForm.valid) {

      const formData = new FormData();
      formData.append("userName", this.EmployeeForm.value.userName);
      formData.append("passWord", this.EmployeeForm.value.password);
      formData.append("fullName", this.EmployeeForm.value.fullname);
      formData.append("phone", this.EmployeeForm.value.phone);
      formData.append("imei1", this.EmployeeForm.value.imei1);
      formData.append("imei2", this.EmployeeForm.value.imei2);
      formData.append("role", this.EmployeeForm.value.role);
      formData.append("Image", this.fileGH);


      if(this.mobileUser){
        formData.append("Id", this.mobileUser.id.toString());
        this.dwmService.updateMobileUsers(formData).subscribe({
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
      }else{
      this.dwmService.addMobileUsers(formData).subscribe({
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

  closeModal() {

    this.activeModal.close()
  }

  getImage(url:string){
    return this.commonService.createImgPath(url)
  }

  getImage2() {
    

    if (this.imagePath != null) {
      return this.imagePath
    }
    if ( this.mobileUser&&  this.mobileUser.imagePath != "") {
     
      return this.getImage(this.mobileUser.imagePath!)
    }
    else {
      return 'assets/images/profile.jpg'
    }
  }
}

