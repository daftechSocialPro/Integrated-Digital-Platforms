import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { IMemberUpdateDto, IMembersGetDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { GenerateIdCardComponent } from '../generate-id-card/generate-id-card.component';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  member: IMembersGetDto;
  user: UserView;
  imagePath: any;
  fileGH: File;
  educationalLelvels: SelectList[];
  educationalFields: SelectList[];
  updateProfileForm: FormGroup;
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private memberService: MemberService,
    private dropdownService: DropDownService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getMember();


    this.getEducationalLevels();

    this.updateProfileForm = this.formBuilder.group({
      fullName: [Validators.required],
      educationalField: ['', Validators.required],
      educationalLevelId: ['', Validators.required],
      gender: ['', Validators.required],
      institute: ['', Validators.required],
      woreda: ['', Validators.required],
      email:[''],
      birthDate: ['', Validators.required],
      instituteRole: ['', Validators.required]
    });
  }

  getMember() {
    this.memberService.getSingleMember(this.user.loginId).subscribe({
      next: (res) => {
        this.member = res;
        console.log(res)

        this.updateProfileForm.controls['fullName'].setValue(this.member.fullName);
        this.updateProfileForm.controls['educationalField'].setValue(this.member.educationalField);
        this.updateProfileForm.controls['educationalLevelId'].setValue(this.member.educationalLevelId.toLowerCase());
        this.updateProfileForm.controls['gender'].setValue(this.member.gender);
        this.updateProfileForm.controls['institute'].setValue(this.member.inistitute);
        this.updateProfileForm.controls['woreda'].setValue(this.member.woreda);
        this.updateProfileForm.controls['email'].setValue(this.member.email)
        this.updateProfileForm.controls['birthDate'].setValue(this.member.birthDate.split('T')[0]);

        this.updateProfileForm.controls['instituteRole'].setValue(this.member.instituteRole && this.member.instituteRole);
      }
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
        phoneNumber: this.member.phoneNumber,
        email:this.updateProfileForm.value.email,
        educationalLevelId: this.updateProfileForm.value.educationalLevelId,
        educationalField: this.updateProfileForm.value.educationalField,
        birthDate: this.updateProfileForm.value.birthDate,
        gender: this.updateProfileForm.value.gender,
        woreda: this.updateProfileForm.value.woreda,
        instituteRole: this.updateProfileForm.value.instituteRole,
        institute: this.updateProfileForm.value.institute
      };
    }
      var formData = new FormData();
      for (let key in updateProfile) {
        if (updateProfile.hasOwnProperty(key)) {
          formData.append(key, (updateProfile as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('image', this.fileGH);
    
    this.memberService.updateProfile(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
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
