import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ResponseMessage2, SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersGetDto, ICompletePorfileDto, IMemberTelegramDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { IPaymentData, IMakePayment } from 'src/models/payment/IPaymentDto';

@Component({
  selector: 'app-pending-members',
  templateUrl: './pending-members.component.html',
  styleUrls: ['./pending-members.component.scss']
})
export class PendingMembersComponent implements OnInit {

  @Input() memberTelegram: ResponseMessage2
  paymentStatus: string;
  txt_rn: string;
  completeProfileForm!: FormGroup;
  user!: UserView;
  member: IMembersGetDto;
  imagePath: any = null;
  fileGH: File;
  returnUrl = environment.clienUrl + '/auth/payment-verfication/';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private commonService: CommonService,
    private dropdownService: DropDownService,
    private confirmationService: ConfirmationService,
    private memberService: MemberService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private authGuard: AuthGuard,
    private paymentService: PaymentService
  ) { }

  educationalFields: SelectList[];
  educationalLelvels: SelectList[];
  membershipTypes: SelectList[]

  selectedMembership: string
  selectedAmount: number


  ngOnInit(): void {
    // this.user = this.userService.getCurrentUser();

    this.completeProfileForm = this.formBuilder.group({
      selectedMembership: ['', Validators.required]


    });

    this.getMember();



  }

  getMembershipTypes(type: string) {
    this.dropdownService.getMembershipDropDown(type).subscribe({
      next: (res) => {
        this.membershipTypes = res
      }
    })
  }
  getMember() {
    console.log("membert", this.memberTelegram)
    this.memberService.getSingleMember(this.memberTelegram.member.id).subscribe({
      next: (res) => {
        console.log(res);
        this.member = res;
      }
    });
  }

  onMembershipSelcted(item: string) {
    console.log(item)
    var k = item.split('/')
    this.selectedAmount = Number.parseInt(k[1])
    this.selectedMembership = k[0]
  }



  register() {
    if (this.imagePath == null || this.imagePath == undefined || this.imagePath == '') {
      this.messageService.add({ severity: 'error', summary: 'Image not Found.', detail: 'Please select an image' });
      return;
    }
    if (this.completeProfileForm.valid) {
      var completeProfile: ICompletePorfileDto = {
        id: this.member.id,
        educationalLevelId: this.completeProfileForm.value.educationalLevelId,
        educationalField: this.completeProfileForm.value.educationalField,
        gender: this.completeProfileForm.value.gender,
        instituteRole: this.completeProfileForm.value.inistituteRole,
        birthDate: this.completeProfileForm.value.birthDate
      };

      var formData = new FormData();
      for (let key in completeProfile) {
        if (completeProfile.hasOwnProperty(key)) {
          formData.append(key, (completeProfile as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('image', this.fileGH);
      this.memberService.completeProfile(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            this.closeModal();

            var loginForm = {
              userName: this.member.memberId,
              password: '1234',
              IsEncryptChecked: [false, Validators.required]
            };

            this.userService.login(loginForm).subscribe({
              next: (res) => {
                if (res.success) {
                  sessionStorage.setItem('token', res.data);
                  this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
                  window.location.reload();
                }
              }
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!.', detail: res.message });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err.message });

          console.log(err);
        }
      });
    }
  }

  checkIfPhoneNumberExist(phoneNumber: string) {
    console.log(phoneNumber);

    this.memberService.checkIfPhoneNumberExist(phoneNumber).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.confirmationService.confirm({
            message: 'You have already Registerd!! you want to proceed from where you stop ?',
            header: 'Phone number already registerd ',
            icon: 'pi pi-info-circle',
            accept: () => { },
            reject: (type: ConfirmEventType) => {
              switch (type) {
                case ConfirmEventType.REJECT:
                  this.completeProfileForm.controls['phoneNumber'].setValue('');
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
                case ConfirmEventType.CANCEL:
                  this.completeProfileForm.controls['phoneNumber'].setValue('');
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
              }
            },
            key: 'positionDialog'
          });
        } else {
        }
      }
    });
  }

  verifyPayment() {
    this.memberService.getSingleMemberPayment(this.member.id).subscribe({
      next: (res) => {
        console.log(res);
        this.paymentService.verifyPayment(res.text_Rn).subscribe({
          next: (re) => {
            console.log(res);
            if (re.response) {
              if (re.response.status === 'success') {
                this.MakePaymentConfirmation(res.text_Rn);
              }
              this.paymentStatus = re.response.status;
            } else {
              this.paymentStatus = re.message;
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: err });
          }
        });
      }
    });
  }
  MakePaymentConfirmation(text_rn: string) {
    this.paymentService.MakePaymentConfirmation(text_rn).subscribe({
      next: (res) => { }
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  logout() {
    this.authGuard.logout();
  }

  renewMembership() {
    console.log(this.selectedMembership, this.selectedAmount)
    var payment: IPaymentData = {
      amount: this.selectedAmount,
      currency: 'ETB',
      email: this.memberTelegram.member.email,
      first_name: this.memberTelegram.member.fullName,
      last_name: '',
      phone_number: this.memberTelegram.member.phoneNumber,
      return_url: this.returnUrl,
      title: `Payment for Membership`,
      description: this.memberTelegram.member.memberId
    };
    this.goTOPayment(payment, this.member);
  }


  renewMembership2() {

    var payment: IPaymentData = {
      amount: this.memberTelegram.member.amount,
      currency: 'ETB',
      email: this.memberTelegram.member.email,
      first_name: this.memberTelegram.member.fullName,
      last_name: '',
      phone_number: this.memberTelegram.member.phoneNumber,
      return_url: this.returnUrl,
      title: `Payment for Membership`,
      description: this.memberTelegram.member.memberId
    };


    this.paymentService.payment(payment).subscribe({
      next: (res) => {
        window.location.href = this.memberTelegram.member.url;
        this.verifyPayment()
      }
    })





  }
  renewMembership3() {

  console.log(this.memberTelegram)

    var payment: IPaymentData = {
      amount: this.memberTelegram.member.amount,
      currency: 'ETB',
      email: this.memberTelegram.member.email,
      first_name: this.memberTelegram.member.fullName,
      last_name: '',
      phone_number: this.memberTelegram.member.phoneNumber,
      return_url: this.returnUrl,
      title: `Payment for Membership`,
      description: this.memberTelegram.member.memberId
    };


    this.paymentService.payment(payment).subscribe({
      next: (res) => {

        var mapayment: IMakePayment = {
          memberId: this.memberTelegram.member.id,
          membershipTypeId:this.memberTelegram.member.membershipTypeId,
          payment: payment.amount,
          text_Rn: res.response.tx_ref,
          url:res.response.data.checkout_url
        };

        var url = res.response.data.checkout_url;
        this.makePayment(mapayment, url);



      }
    })





  }










  goTOPayment(payment: IPaymentData, member: any) {


    this.paymentService.payment(payment).subscribe({
      next: (res) => {

        console.log(res)
        if (res.response){
       
        var mapayment: IMakePayment = {
          memberId: this.memberTelegram.member.id,
          membershipTypeId: this.selectedMembership,
          payment: payment.amount,
          text_Rn: res.response.tx_ref,
          url: res.response.data.checkout_url
        };

        var url = res.response.data.checkout_url;
        this.makePayment(mapayment, url);

        console.log("after payment", res);
      }
      else {
        this.messageService.add({severity:'error',summary:'Invalid Information Please contact your admin ',detail:res.message})
      }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  makePayment(makePay: IMakePayment, url: string) {
    this.paymentService.MakePayment(makePay).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          window.location.href = url;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Authentication failed.', detail: res.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wron!!!', detail: err.message });
      }
    });
  }
}
