import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ChangePasswordModel, UserList, UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
 
 @Input() user !: UserList;
 @Input() isReset: boolean;

 passwordForm!: FormGroup
 constructor (
  private activeModal:NgbActiveModal,
  private formBuilder: FormBuilder,
  private userService:UserService,
  private messageService: MessageService
  ){


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
    //throw new Error('Method not implemented.');
  }


  closeModal(){

    this.activeModal.close()

  }

  submit2() {
    debugger;
    if (this.passwordForm.valid || this.isReset) {

      var formData: ChangePasswordModel = {
        UserId: this.user.id,
        CurrentPassword: this.isReset ? "none" :this.passwordForm.value.OldPassowrd,
        NewPassword: this.passwordForm.value.NewPassword,
        isReset:  this.isReset
      }
      this.userService.changePassword(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfully Updated.', detail: res.message });
            this.closeModal()
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!.', detail: res.message });

          }

        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Network error.!!.', detail: err });
          console.error(err)
        }
      })

    }

  }

  

}
