import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CompanyProfileGetDto, CompanyProfilePostDto } from 'src/app/model/configuration/ICompanyProfileDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  imagePath: any = null;
  CompanyProfileForm !: FormGroup;
  companyProfile!: CompanyProfileGetDto;
  user !: UserView;
  fileGH!: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
    private configurationService: ConfigurationService,
    private messageService: MessageService) {
    this.CompanyProfileForm = this.formBuilder.group({
      companyName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, Validators.required],
      address: [null, Validators.required],
      description: [null]
    })
  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getCompanyProfile()
  }

  getCompanyProfile() {
    this.configurationService.getCompanyProfile().subscribe({
      next: (res) => {
       
        this.companyProfile = res
        this.CompanyProfileForm.controls['companyName'].setValue(res.companyName)
        this.CompanyProfileForm.controls['phoneNumber'].setValue(res.phoneNumber)
        this.CompanyProfileForm.controls['email'].setValue(res.email)
        this.CompanyProfileForm.controls['address'].setValue(res.address)
        this.CompanyProfileForm.controls['description'].setValue(res.description)


      }, error: (err) => {
        console.log(err)
      }

    })

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


  submit() {


    if (this.imagePath === null) {

      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail: 'Image File not Selected' });
      return;
    }


    if (this.CompanyProfileForm.valid) {



      var companyProfilePost: CompanyProfilePostDto = {

        companyName: this.CompanyProfileForm.value.companyName,
        phoneNumber: this.CompanyProfileForm.value.phoneNumber,
        email: this.CompanyProfileForm.value.email,
        address: this.CompanyProfileForm.value.address,
        createdById: this.user.userId,
        description: this.CompanyProfileForm.value.description

      }
      var formData = new FormData();
      for (let key in companyProfilePost) {
        if (companyProfilePost.hasOwnProperty(key)) {
          formData.append(key, (companyProfilePost as any)[key]);
        }
      }


      formData.append('imagePath', this.fileGH);

      this.configurationService.addCompanyProfile(formData).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getCompanyProfile()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        }
      )

    }
  }

  update() {


    // if (this.imagePath === null) {

    //   this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail: 'Image File not Selected' });
    //   return;
    // }


    if (this.CompanyProfileForm.valid) {
      var companyProfilePost: CompanyProfilePostDto = {
        id: this.companyProfile.id,
        companyName: this.CompanyProfileForm.value.companyName,
        phoneNumber: this.CompanyProfileForm.value.phoneNumber,
        email: this.CompanyProfileForm.value.email,
        address: this.CompanyProfileForm.value.address,
        createdById: this.user.userId,
        description: this.CompanyProfileForm.value.description
      }
      var formData = new FormData();
      for (let key in companyProfilePost) {
        if (companyProfilePost.hasOwnProperty(key)) {
          formData.append(key, (companyProfilePost as any)[key]);
        }
      }


      formData.append('imagePath', this.fileGH);

      this.configurationService.UpdateCompanyProfile(formData).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getCompanyProfile()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        }
      )

    }
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }
  getImage2() {

    if (this.imagePath != null) {
      return this.imagePath
    }
    if (this.companyProfile != null) {
      return this.getImage(this.companyProfile.logo)
    }
    else {
      return 'assets/img/company.jpg'
    }
  }

}
