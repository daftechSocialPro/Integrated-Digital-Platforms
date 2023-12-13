import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordModel, UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'primeng/api';
import { LoanInfoDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  user !: UserView
  Employee!: EmployeeGetDto
  EmployeeForm!: FormGroup
  passwordForm!: FormGroup
  imageURL!: string;
  loanInfo!: LoanInfoDto;
  roleLists: string[] = [];



  constructor(
    private hrmService: HrmService,
    private userService: UserService,
    private authGuard: AuthGuard,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private messageService: MessageService) {
    this.EmployeeForm = this.formBuilder.group({
      avatar: [null],
      firstName: ['', Validators.required],
      middleName :['',Validators.required],      
      lastName: ['', Validators.required],      
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
     
    })
    this.passwordForm = this.formBuilder.group({

      OldPassowrd: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', [Validators.required, this.matchValues('NewPassword')]]

    })


  }

  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      // Get the value of the control to match against
      const matchingValue = control.parent?.get(matchTo)?.value;

      // If the values don't match, set an error on the control
      if (control.value !== matchingValue) {
        return { mismatchedValues: true };
      }

      // If the values match, clear any previous errors on the control
      return null;
    };
  }


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.roleLists = this.user.role.toString().split(',');
    console.log("Role Lists",this.roleLists);
    this.getEmployee();
    this.getLoan();


  }

  getEmployee() {
    this.hrmService.getEmployee(this.user.employeeId).subscribe({
      next: (res) => {
        this.Employee = res
        this.EmployeeForm.controls['firstName'].setValue(res.firstName)
        this.EmployeeForm.controls['lastName'].setValue(res.lastName)
        this.EmployeeForm.controls['email'].setValue(res.email)
        this.EmployeeForm.controls['phoneNumber'].setValue(res.phoneNumber)
        this.EmployeeForm.controls['middleName'].setValue(res.middleName)
        // this.EmployeeForm.controls['address'].setValue(res.z)
        this.imageURL = this.commonService.createImgPath(res.imagePath!)

      }, error: (err) => {
        console.error(err)
      }
    });
  }

  getLoan() {
    this.hrmService.employeesLoanAmmount(this.user.employeeId).subscribe({
      next: (res) => {
        this.loanInfo = res
      }, error: (err) => {
        console.error(err)
      }
    });
  }


  getImage(value: string) {
    return this.commonService.createImgPath(value)
  }


  showPreview(event: any) {
    const file = (event.target).files[0];

    this.EmployeeForm.patchValue({
      avatar: file
    });
    this.EmployeeForm.get('avatar')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  submit() {

    if (this.EmployeeForm.valid) {

      var value = this.EmployeeForm.value;
      var file = value.avatar

      const formData = new FormData();
      file ? formData.append('imagePath', file, file.name) : "";

      formData.set('id', this.Employee.id)
      formData.set('photo', this.Employee.imagePath!)     
      formData.set('firstName', value.firstName);
      formData.set('middleName', value.middleName);
      formData.set('lastName', value.lastName);
      formData.set('email', value.email);
      formData.set('phoneNumber', value.phoneNumber);
      


      this.hrmService.updateEmployeeData(formData).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Somethin went wrong.', detail: res.message });

          }



        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Somethin went wrong.', detail: err });

        }
      })
    }

  }
  submit2() {
    if (this.passwordForm.valid) {

      var formData: ChangePasswordModel = {
        UserId: this.user.userId,
        CurrentPassword: this.passwordForm.value.OldPassowrd,
        NewPassword: this.passwordForm.value.NewPassword
      }
      this.userService.changePassword(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfully Updated.', detail: res.message });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!.', detail: res.message });

          }

          this.authGuard.logout()


        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Network error.!!.', detail: err });



          console.error(err)
        }
      })

    }

  }



}
