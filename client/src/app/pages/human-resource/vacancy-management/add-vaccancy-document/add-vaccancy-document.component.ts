import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-add-vaccancy-document',
  templateUrl: './add-vaccancy-document.component.html',
  styleUrls: ['./add-vaccancy-document.component.css']
})
export class AddVaccancyDocumentComponent implements OnInit {

  @Input() vaccancyId !: string 
  VaccancyDocumentForm!:FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private vaccancyService : VacancyService,
    private messageService: MessageService

    ) { }

  ngOnInit(): void {

    this.VaccancyDocumentForm = this.formBuilder.group({
      docuemntName: ['', Validators.required],
      documentPath: ['']
      
    })

  }
  

  closeModal() {

    this.activeModal.close()

  }
  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.VaccancyDocumentForm.controls['documentPath'].setValue(file)
   
  }

  submit(){

if (this.VaccancyDocumentForm.valid){


  var formData = new FormData()
  formData.append("vacancyId",this.vaccancyId)
  formData.append("docuemntName",this.VaccancyDocumentForm.value.docuemntName)
  formData.append("documentPath",this.VaccancyDocumentForm.value.documentPath)

  this.vaccancyService.addVaccancyDocument(formData).subscribe({
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

}
