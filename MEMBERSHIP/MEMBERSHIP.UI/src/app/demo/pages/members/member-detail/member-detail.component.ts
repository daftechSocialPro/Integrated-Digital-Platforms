import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersGetDto, IMemberUpdateDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: IMembersGetDto;
  user: UserView;
  imagePath: any;
  fileGH: File;
  educationalLelvels: SelectList[];
  educationalFields: SelectList[];
  updateProfileForm: FormGroup;

  chapters: SelectList[] = [];

  memberships: SelectList[];
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private memberService: MemberService,
    private dropdownService: DropDownService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

    this.getEducationalLevels();
    this.getMemberships(this.member && this.member.membershipCategory);
    this.getChapters();

    if (this.member) {
    }
    this.updateProfileForm = this.formBuilder.group({
      fullName: [this.member.fullName, Validators.required],
      phoneNumber: [this.member.phoneNumber, Validators.required],
      educationalField: [this.member.educationalField, Validators.required],
      educationalLevelId: [this.member.educationalLevelId && this.member.educationalLevelId.toLowerCase(), Validators.required],
      gender: [this.member.gender, Validators.required],
      institute: [this.member.inistitute, Validators.required],
      email: [this.member.email],
      woreda: [this.member.woreda],
      birthDate: [this.member.birthDate.split('T')[0], Validators.required],
      instituteRole: [this.member.instituteRole, Validators.required],
      expiredDate: [this.member.expiredDate ? this.member.expiredDate.toString().split('T')[0] : null],
      lastPaid: [this.member.lastPaid != null ? this.member.lastPaid.toString().split('T')[0] : null],
      paymentStatus: [this.member.paymentStatus],
      regionId: [this.member.regionId, Validators.required],
      membershipType: [this.member.membershipTypeId]
    });
  }

  getMemberships(category: string) {
    this.dropdownService.getMembershipDropDown(category).subscribe({
      next: (res) => {
        this.memberships = res;

        this.updateProfileForm.controls['membershipType'].setValue(this.member.membershipTypeId.toLowerCase());
      }
    });
  }

  getChapters() {
    this.dropdownService.getRegionsDropdown('ETHIOPIAN').subscribe({
      next: (res) => {
        this.chapters = res;

        this.updateProfileForm.patchValue({
          regionId: this.member.regionId.toLowerCase()
        });
      },
      error: (err) => {}
    });
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
  onUpload(event: any) {
    var file: File = event.target.files[0];
    this.fileGH = file;
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    };
    myReader.readAsDataURL(file);
  }
  getEducationalLevels() {
    this.dropdownService.getEducationLevelDropdown().subscribe({
      next: (res) => {
        this.educationalLelvels = res;
      }
    });
  }

  submit() {
    if (this.updateProfileForm.valid) {
      var updateProfile: IMemberUpdateDto = {
        id: this.member.id,
        fullName: this.updateProfileForm.value.fullName,
        phoneNumber: this.updateProfileForm.value.phoneNumber,
        email: this.updateProfileForm.value.email,
        educationalLevelId: this.updateProfileForm.value.educationalLevelId,
        educationalField: this.updateProfileForm.value.educationalField,
        birthDate: this.updateProfileForm.value.birthDate,
        gender: this.updateProfileForm.value.gender,
        woreda: this.updateProfileForm.value.woreda,
        instituteRole: this.updateProfileForm.value.instituteRole,
        institute: this.updateProfileForm.value.institute,
        regionId: this.updateProfileForm.value.regionId,

        lastPaid: this.updateProfileForm.value.lastPaid,
        expiredDate: this.updateProfileForm.value.expiredDate,
        paymentStatus: this.updateProfileForm.value.paymentStatus,
        membershipTypeId: this.updateProfileForm.value.membershipType
      };

      const formData = new FormData();

      formData.set('id', updateProfile.id);
      formData.set('fullName', updateProfile.fullName);
      formData.set('phoneNumber', updateProfile.phoneNumber);
      formData.set('email', updateProfile.email);
      formData.set('educationalLevelId', updateProfile.educationalLevelId);
      formData.set('educationalField', updateProfile.educationalField);
      formData.set('birthDate', updateProfile.birthDate.toString());
      formData.set('gender', updateProfile.gender);
      formData.set('woreda', updateProfile.woreda);
      formData.set('instituteRole', updateProfile.instituteRole);
      formData.set('institute', updateProfile.institute);

      formData.set('lastPaid', updateProfile.lastPaid.toString());
      formData.set('expiredDate', updateProfile.expiredDate.toString());
      formData.set('paymentStatus', updateProfile.paymentStatus);
      formData.set('membershipTypeId', updateProfile.membershipTypeId);
      formData.set('regionId', updateProfile.regionId);

      formData.append('image', this.fileGH);

      this.memberService.updateProfileFromAdmin(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            this.closeModal();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!.', detail: res.message });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err.message });
        }
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  getExpiredDate() {
    var lastPaid = this.updateProfileForm.value.lastPaid;
    var isPaid = this.updateProfileForm.value.paymentStatus == 'PAID';
    var memberTypeId = this.updateProfileForm.value.membershipType;

    if (isPaid && lastPaid && memberTypeId) {
      this.memberService.getExpiredDate(lastPaid, memberTypeId).subscribe({
        next: (res) => {
          this.updateProfileForm.patchValue({
            expiredDate: res.data.split('T')[0]
          });
          console.log(res.data)
        }
      });
    }
  }
}
