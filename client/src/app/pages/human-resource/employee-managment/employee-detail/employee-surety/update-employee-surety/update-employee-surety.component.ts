import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeSuertyGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee-surety',
  templateUrl: './update-employee-surety.component.html',
  styleUrls: ['./update-employee-surety.component.css']
})
export class UpdateEmployeeSuretyComponent implements OnInit {


  @Input() employeeSurety!: EmployeeSuertyGetDto
  photoPath: any = null;
  filePhoto!: File;
  fileLetter!: File;
  fileIdCard!: File;
  SuretyForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private hrmService: HrmService,
  ) {



    this.SuretyForm = this.formBuilder.group({

      fullName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      suretyAddress: [null, Validators.required],
      companyName: [null, Validators.required],
      compnayPhoneNumber: [null, Validators.required]
    })
  }

  ngOnInit(): void {

    this.SuretyForm.controls['fullName'].setValue(this.employeeSurety.fullName)
    this.SuretyForm.controls['phoneNumber'].setValue(this.employeeSurety.phoneNumber)
    this.SuretyForm.controls['suretyAddress'].setValue(this.employeeSurety.suretyAddress)
    this.SuretyForm.controls['companyName'].setValue(this.employeeSurety.companyName)
    this.SuretyForm.controls['compnayPhoneNumber'].setValue(this.employeeSurety.compnayPhoneNumber)

  }
  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.filePhoto = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.photoPath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  onUploadLetter(event: any) {

    var file: File = event.target.files[0];
    this.fileLetter = file

  }
  onUploadId(event: any) {
    var file: File = event.target.files[0];
    this.fileIdCard = file
  }

  submit() {


    if (this.SuretyForm.valid) {
      var formData = new FormData();
      formData.append('photo', this.filePhoto);
      formData.append('letter', this.fileLetter);
      formData.append('idCard', this.fileIdCard);
      formData.append('fullName', this.SuretyForm.value.fullName);
      formData.append('phoneNumber', this.SuretyForm.value.phoneNumber);
      formData.append('suretyAddress', this.SuretyForm.value.suretyAddress);
      formData.append('companyName', this.SuretyForm.value.companyName);
      formData.append('compnayPhoneNumber', this.SuretyForm.value.compnayPhoneNumber);
      formData.append('id', this.employeeSurety.id)
      this.hrmService.updateEmployeeSurety(formData).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })



    }


  }
  closeModal() {
    this.activeModal.close()
  }
  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }
  getImage2() {

    if (this.photoPath != null) {
      return this.photoPath
    }
    if (this.employeeSurety != null) {
      return this.createImagePath(this.employeeSurety.photoPath!)
    }
    else {
      return 'assets/img/company.jpg'
    }
  }

}
