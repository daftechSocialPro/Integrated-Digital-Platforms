import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { EmployeeDocumentsGetDTO, EmployeeFileGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee-file',
  templateUrl: './update-employee-file.component.html',
  styleUrls: ['./update-employee-file.component.css']
})
export class UpdateEmployeeFileComponent implements OnInit {

  @Input() employeeFile!: EmployeeDocumentsGetDTO

  FileForm !: FormGroup;
  fileGH!: File;
  documentTypesSelectList!: SelectList[]
  documentTypeId: number
  previewUrl: SafeUrl | null = null;
  isImage = false;
  isPdf = false;
  previewResourceUrl: SafeResourceUrl | null = null;

  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private messageService: MessageService,
    private configService: ConfigurationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void { 
    this.getDocumentType()
    this.FileForm = this.formBuilder.group({
      documentTypeId : [this.employeeFile.documentTypeId, Validators.required]
    })
  }

  getDocumentType() {
    this.configService.getDocumentTypeSelectList(0).subscribe({
      next: (res) => {
        this.documentTypesSelectList = res
      }, error: (err) => {
        
      }
    })
  }
  onUpload(event: any) {

    if (event.target.files.length > 0) {
      
      var file: File = event.target.files[0];
      this.fileGH = file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        //this.isImage = file.type.startsWith('image/');
        const fileType = file.type;
        this.isImage = fileType.startsWith('image/');
        this.isPdf = fileType === 'application/pdf';
        if (this.isImage) {
          this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
          this.previewResourceUrl = null;
        } else if (this.isPdf) {
          this.previewUrl = null;
          this.previewResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
        } else {
          this.previewUrl = null;
          this.previewResourceUrl = null;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {
    if (this.FileForm.valid) {

      var formData = new FormData();

      formData.append('document', this.fileGH);
      formData.append('fileName',this.FileForm.value.fileName)
      formData.append('id',this.employeeFile.id)
      formData.append('documentTypeId', this.employeeFile.documentTypeId)
      formData.append('employeeId', this.employeeFile.employeeId)
      formData.append('createdById', this.employeeFile.createdById)


      this.hrmService.updateEmployeeFile(formData).subscribe(
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
        }
      )

    }

  }
  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }
}
