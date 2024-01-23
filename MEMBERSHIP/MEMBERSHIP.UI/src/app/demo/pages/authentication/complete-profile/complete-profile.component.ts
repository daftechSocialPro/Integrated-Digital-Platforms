import { Component, OnInit } from '@angular/core';
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
import { SelectList } from 'src/models/ResponseMessage.Model';
import { ICompletePorfileDto, IMembersGetDto, IMembersPostDto, MoodleUpdateDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  paymentStatus: string;
  txt_rn: string;
  completeProfileForm!: FormGroup;
  user!: UserView;
  member: IMembersGetDto;
  imagePath: any = null;
  fileGH: File;
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
  ) {}

  educationalFields: SelectList[];
  educationalLelvels: SelectList[];

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    this.completeProfileForm = this.formBuilder.group({
      educationalField: ['', Validators.required],
      educationalLevelId: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      inistituteRole: ['', Validators.required]
    });

    this.getMember();

    this.getEducationalLevels();
  }

  getMember() {
    this.memberService.getSingleMember(this.user.loginId).subscribe({
      next: (res) => {
        console.log(res);
        this.member = res;
      }
    });
  }

  getEducationalLevels() {
    this.dropdownService.getEducationLevelDropdown().subscribe({
      next: (res) => {
        this.educationalLelvels = res;
      }
    });
  }

  onUpload(event: any) {
    var file: File = event.target.files[0];
    this.fileGH = file;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  getImage2() {
    if (this.imagePath != null && this.imagePath != '') {
      return this.imagePath;
    }
    if (this.member && this.member.imagePath != '' && this.member.imagePath != null) {
      return this.getImage(this.member.imagePath!);
    } else {
      return '../../../../../assets/images/profile.jpg';
    }
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
            accept: () => {},
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
      next: (res) => {}
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  logout() {
    this.authGuard.logout();
  }




  registerMoodle() {

    const  autoGeneratedId= uuidv4();;

    const formData = new FormData();
    const password = this.commonService.generatePassword(10);
    const userName = this.member.fullName.split(' ')[0].toLowerCase()+'_' + this.commonService.generatePassword(5).toLowerCase()

    formData.append('moodlewsrestformat', 'json');
    formData.append('wsfunction', 'core_user_create_users');
    formData.append('wstoken', '39df265f0c3e1b44eb442be8afe49c50');
    formData.append('users[0][username]', userName);
    formData.append('users[0][password]', password);
    formData.append('users[0][firstname]', this.member.fullName.split(' ')[0]);
    formData.append('users[0][lastname]', this.member.fullName.split(' ')[1]);
    formData.append('users[0][email]', this.member.email);
    formData.append('users[0][idnumber]', autoGeneratedId);
    formData.append('users[0][lang]', 'en');
    formData.append('users[0][description]', 'If you die you die');

    this.memberService.callMoodle(formData).subscribe({
      next: (res) => {      
        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Your moodle Registration was successfull' });
       
        if (res[0]) {
          var moodleDto: MoodleUpdateDto = {
            moodleName: res[0].username,
            moodleId: res[0].id.toString(),
            memberId: this.member.id,
            moodlePassword: password
          }
          this.updateMember(moodleDto)
      

        }
        else {
          this.messageService.add({ severity: 'error', summary: res.debuginfo, detail: res.message });
        }



      }
    })
  }

  updateMember(updateMoodleDto: MoodleUpdateDto) {
    this.memberService.updateMoodleApi(updateMoodleDto).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Your moodle updated was successfull' });
          window.location.reload()
         
        } else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong!!!', detail: res.message });
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wrong!!', detail: err });
      }
    })
  }
}
