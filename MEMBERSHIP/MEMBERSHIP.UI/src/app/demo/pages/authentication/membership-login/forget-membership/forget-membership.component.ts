import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from 'src/app/services/member.service';
import { errorToast, successToast } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forget-membership',
  templateUrl: './forget-membership.component.html',
  styleUrls: ['./forget-membership.component.scss']
})
export class ForgetMembershipComponent implements OnInit {
  contactInput: string = '';
  errorMessage: string = '';
  isValid: boolean = false;

  ngOnInit(): void {}

  constructor(
    private activeModal: NgbActiveModal,
    private memberService: MemberService
  ) {}

  closeModal() {
    this.activeModal.close();
  }

  validateContact() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ethiopianPhonePattern = /^(\+251|251|0)?(9\d{8})$/;

    if (emailPattern.test(this.contactInput)) {
      this.errorMessage = '';
      this.isValid = true;
    } else if (ethiopianPhonePattern.test(this.contactInput)) {
      this.errorMessage = '';
      this.isValid = true;
    } else {
      this.errorMessage = 'Enter a valid Email or Ethiopian Phone Number';
      this.isValid = false;
    }
  }

  // Function to Submit Data
  submitForgetPassword() {
    if (!this.isValid) {
      return;
    }

    const payload = { contact: this.contactInput };

    this.memberService.forgetMembershipId(this.contactInput).subscribe({
      next: (res) => {
        if (res.success) {
          successToast(res.message);
        } else {
          errorToast(res.message);
        }
      }
    });
  }
}
