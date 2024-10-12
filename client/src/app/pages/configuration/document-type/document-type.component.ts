import { Component } from '@angular/core';
import { AddDocumentTypeComponent } from './add-document-type/add-document-type.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentTypeGetDTO } from 'src/app/model/configuration/IDocumentTypeDto';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent {

  documentTypes!: DocumentTypeGetDTO[]

  ngOnInit(): void {
    this.getDocumentType()
  }

  constructor(private configService: ConfigurationService, private modalService: NgbModal) { }


  getDocumentType() {
    this.configService.getDocumentTypeList().subscribe({
      next: (res) => {
        this.documentTypes = res
      }, error: (err) => {
        
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddDocumentTypeComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getDocumentType()
    })
  }

  update(documentType: DocumentTypeGetDTO) {
    let modalRef = this.modalService.open(AddDocumentTypeComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.documentType = documentType
    modalRef.result.then(() => {
      this.getDocumentType()
    })

  }

}
