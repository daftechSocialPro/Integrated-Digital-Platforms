import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-surety',
  templateUrl: './add-employee-surety.component.html',
  styleUrls: ['./add-employee-surety.component.css']
})
export class AddEmployeeSuretyComponent implements OnInit {

  @Input() employeeId!:string
  photoPath: any = null;
  filePhoto!: File;
  fileLetter!: File;
  fileIdCard!: File;
  SuretyForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private hrmService: HrmService,
    private configurationService: ConfigurationService,
    private dropService: DropDownService) {



    this.SuretyForm = this.formBuilder.group({

      fullName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      suretyAddress: [null, Validators.required],
      companyName: [null, Validators.required],
      compnayPhoneNumber: [null, Validators.required]
    })
  }

  ngOnInit(): void {

  }
  onUpload(event: any) {
    var file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.filePhoto = file
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.photoPath = myReader.result;
      }
      myReader.readAsDataURL(file);
      // Proceed with uploading the image
    } else {
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'Not Supported File' });   
    }
  }

  onUploadLetter(event: any) {
    var file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.fileLetter = file
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail: 'Not Supported File' });
    }
  }

  onUploadId(event: any) {
    var file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.fileIdCard = file
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail: 'Not Supported File' });
    }
  }

  submit(){
    if (this.photoPath === null) {
     
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'Image File not Selected' });         
      return;
    }

    if (this.fileLetter === null) {
     
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'letter File not Selected' });         
      return;
    }
    if (this.fileIdCard === null) {
     
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'ID card File not Selected' });         
      return;
    }
    if(this.SuretyForm.valid){
      var formData = new FormData();    
      formData.append('photo', this.filePhoto);
      formData.append('letter', this.fileLetter);
      formData.append('idCard', this.fileIdCard);
      formData.append('fullName', this.SuretyForm.value.fullName);
      formData.append('phoneNumber', this.SuretyForm.value.phoneNumber);
      formData.append('suretyAddress', this.SuretyForm.value.suretyAddress);
      formData.append('companyName', this.SuretyForm.value.companyName);
      formData.append('compnayPhoneNumber', this.SuretyForm.value.compnayPhoneNumber);
      formData.append('employeeId',this.employeeId)
      this.hrmService.addEmployeeSurety(formData).subscribe(
        {
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
            
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
            
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        })



    }
  

  }
  closeModal() {
    this.activeModal.close()
  }


}
