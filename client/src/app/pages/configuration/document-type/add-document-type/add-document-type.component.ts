import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DocumentTypeGetDTO, DocumentTypePostDTO } from 'src/app/model/configuration/IDocumentTypeDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.css']
})
export class AddDocumentTypeComponent implements OnInit {

  documentTypeFormGroup!: FormGroup;
  user!: UserView;
  @Input() documentType!: DocumentTypeGetDTO; // Input is now DocumentTypeGetDTO
  totDigit: number = 0; // Assuming this is required, you can adjust accordingly
  fileExtentions =[
      {code:0, name:"JPG"},
      {code:1, name:"JPEG"},
      {code:2, name:"PNG"},
      {code:3, name:"PDF"},
    ]
  documentCategory =[
    {code:0, name:"HRM"},
  ]
  rowstatus=[
    {code:0, name:"Active"},
    {code:1, name:"Inactive"},
  ]

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser(); // Fetching current user
    if (this.documentType != null) {
      this.documentTypeFormGroup = this.formBuilder.group({
        fileName: [this.documentType.fileName, Validators.required],
        fileExtentions: [this.documentType.fileExtentions, Validators.required],
        documentCategory: [this.documentType.documentCategory, Validators.required],
        rowstatus: [this.documentType.rowstatus, Validators.required],
      });
    } else {
      this.documentTypeFormGroup = this.formBuilder.group({
        fileName: ['', Validators.required],
        fileExtentions: ['', Validators.required],
        documentCategory: ['', Validators.required],
        rowstatus: [0, Validators.required],
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService, // Service to handle API requests
    private userService: UserService,
    private messageService: MessageService) { }

  closeModal() {
    this.activeModal.close();
  }

  submit() {
    if (this.documentTypeFormGroup.valid) {
      
      if (this.documentType != null) {
        const documentType: DocumentTypeGetDTO = {
          fileName: this.documentTypeFormGroup.value.fileName,
          fileExtentions: this.documentTypeFormGroup.value.fileExtentions,
          documentCategory: this.documentTypeFormGroup.value.documentCategory,
          createdById: this.user.userId, 
          rowstatus: this.documentTypeFormGroup.value.rowstatus,
          id : this.documentType.id
        };
        
        this.configService.updateDocumentType(documentType).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.closeModal();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      } else {

        const documentType: DocumentTypePostDTO = {
          fileName: this.documentTypeFormGroup.value.fileName,
          fileExtentions: this.documentTypeFormGroup.value.fileExtentions,
          documentCategory: this.documentTypeFormGroup.value.documentCategory,
          createdById: this.user.userId, 
          rowstatus: this.documentTypeFormGroup.value.rowstatus
        };
        this.configService.addDocumentType(documentType).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.closeModal();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      }
    }
  }
}

