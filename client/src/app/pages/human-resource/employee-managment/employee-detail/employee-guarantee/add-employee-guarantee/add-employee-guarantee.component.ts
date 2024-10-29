import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-guarantee',
  templateUrl: './add-employee-guarantee.component.html',
  styleUrls: ['./add-employee-guarantee.component.css']
})
export class AddEmployeeGuaranteeComponent implements OnInit {

  @Input() employeeId!:string
  letterPath: any = null;
  fileLetter!: File;
  guaranteeForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private hrmService: HrmService,
    private configurationService: ConfigurationService,
    private dropService: DropDownService) {



    this.guaranteeForm = this.formBuilder.group({

      fullName: [null, Validators.required],
      amharicFullName: [null, Validators.required],
      organizationName: [null, Validators.required],
      amharicOrganizationName: [null, Validators.required],
      letterNumber: [null, Validators.required],
      letterDate: [null, Validators.required],
    })
  }



  ngOnInit(): void {

  }
  onUpload(event: any) {
    var file: File = event.target.files[0];
    this.fileLetter = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.letterPath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
  

  submit(){
    if (this.letterPath != null) {
      formData.append('letter', this.fileLetter);
    }

    if(this.guaranteeForm.valid){
      var formData = new FormData();    
      formData.append('fullName', this.guaranteeForm.value.fullName);
      formData.append('amharicFullName', this.guaranteeForm.value.amharicFullName);
      formData.append('organizationName', this.guaranteeForm.value.organizationName);
      formData.append('amharicOrganizationName', this.guaranteeForm.value.amharicOrganizationName);
      formData.append('letterNumber', this.guaranteeForm.value.letterNumber);
      formData.append('letterDate', this.guaranteeForm.value.letterDate);
      formData.append('employeeId',this.employeeId)
      this.hrmService.addEmployeeGuarantee(formData).subscribe(
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
