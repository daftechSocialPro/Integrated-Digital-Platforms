import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { EmployeeFilePostDto } from 'src/app/model/HRM/IEmployeeDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-file',
  templateUrl: './add-employee-file.component.html',
  styleUrls: ['./add-employee-file.component.css']
})
export class AddEmployeeFileComponent implements OnInit {

  @Input() employeeId!: string
  documentTypesSelectList!: SelectList[]
  FileForm !: FormGroup;
  fileGH!: File;

  previewUrl: SafeUrl | null = null;
  isImage = false;
  isPdf = false;
  previewResourceUrl: SafeResourceUrl | null = null;
  isAddNew: boolean = false;
  user!: UserView;
  
  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private configService: ConfigurationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void { 
    this.user = this.userService.getCurrentUser();
    this.getDocumentType()
    this.FileForm = this.formBuilder.group({
      documentTypeId : [null, Validators.required],
      newDocumentType: [null],
      fileExtension: [3] // Default to PDF
    })
  }

  toggleAddNew() {
    this.isAddNew = !this.isAddNew;
    if (this.isAddNew) {
      this.FileForm.controls['documentTypeId'].clearValidators();
      this.FileForm.controls['newDocumentType'].setValidators([Validators.required]);
      this.FileForm.controls['fileExtension'].setValidators([Validators.required]);
    } else {
      this.FileForm.controls['documentTypeId'].setValidators([Validators.required]);
      this.FileForm.controls['newDocumentType'].clearValidators();
      this.FileForm.controls['fileExtension'].clearValidators();
    }
    this.FileForm.controls['documentTypeId'].updateValueAndValidity();
    this.FileForm.controls['newDocumentType'].updateValueAndValidity();
    this.FileForm.controls['fileExtension'].updateValueAndValidity();
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

      if (this.isAddNew) {
        const newDocType = {
          fileName: this.FileForm.value.newDocumentType,
          fileExtentions: Number(this.FileForm.value.fileExtension),
          documentCategory: 0, // HRM/Employee
          createdById: this.user.userId,
          rowstatus: 0
        };

        this.configService.addDocumentType(newDocType).subscribe({
          next: (res) => {
            if (res.success) {
              // Extract the new ID from the message or reload list if necessary
              // Assuming res.data or similar contains the ID, but let's re-fetch or use the name
              this.configService.getDocumentTypeSelectList(0).subscribe({
                next: (res2) => {
                  this.documentTypesSelectList = res2;
                  const addedType = res2.find(x => x.name === this.FileForm.value.newDocumentType);
                  if (addedType) {
                    this.saveEmployeeFile(addedType.id);
                  }
                }
              });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }
        });
      } else {
        this.saveEmployeeFile(this.FileForm.value.documentTypeId);
      }
    }
  }

  saveEmployeeFile(documentTypeId: string) {
    var formData = new FormData();

    formData.append('document', this.fileGH);
    formData.append('employeeId', this.employeeId);
    formData.append('documentTypeId', documentTypeId);

    this.hrmService.addEmployeeFile(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          this.closeModal();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
      }
    });
  }

}