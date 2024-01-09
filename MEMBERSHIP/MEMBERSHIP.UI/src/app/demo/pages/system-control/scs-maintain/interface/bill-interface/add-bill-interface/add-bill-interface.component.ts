import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralInterfceDto } from 'src/models/system-control/IGeneralInterfaceDto';

@Component({
  selector: 'app-add-bill-interface',
  templateUrl: './add-bill-interface.component.html',
  styleUrls: ['./add-bill-interface.component.scss']
})
export class AddBillInterfaceComponent  implements OnInit {

  @Input() GeneralInterface: IGeneralInterfceDto
  GeneralInterfaceForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.GeneralInterface) {
      this.GeneralInterfaceForm = this.formBuilder.group({
        recordno:[this.GeneralInterface.recordno,Validators.required],
        objectNameEN: [this.GeneralInterface.objectNameEN, Validators.required],
        objectNameLocalen: [this.GeneralInterface.objectNameLocalen, Validators.required],
        objectNameLocalam: [this.GeneralInterface.objectNameLocalam, Validators.required],
      })
    }
    else {
      this.GeneralInterfaceForm = this.formBuilder.group({

        recordno:['',Validators.required],
        objectNameEN: ['', Validators.required],
        objectNameLocalen: ['', Validators.required],
        objectNameLocalam: ['', Validators.required],

      })
    }


  }

  submit() {

    if (this.GeneralInterfaceForm.valid) {

      let addGeneralInterface: IGeneralInterfceDto = {
        recordno:this.GeneralInterfaceForm.value.recordno,
        objectNameEN: this.GeneralInterfaceForm.value.objectNameEN,
        objectNameLocalen:this.GeneralInterfaceForm.value.objectNameLocalen,
        objectNameLocalam:this.GeneralInterfaceForm.value.objectNameLocalam,
        objectCategory: "BILLINTERFACE"
      }

      this.controlService.addGeneralInterface(addGeneralInterface).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })


    }
    else {


    }
  }

  update() {
    if (this.GeneralInterfaceForm.valid) {

      let addGeneralInterface: IGeneralInterfceDto = {
        objectNameEN: this.GeneralInterfaceForm.value.objectNameEN,
        objectNameLocalen:this.GeneralInterfaceForm.value.objectNameLocalen,
        objectNameLocalam:this.GeneralInterfaceForm.value.objectNameLocalam,
        objectCategory: "BILLINTERFACE",
        recordno:this.GeneralInterface.recordno
      }
      this.controlService.updateGeneralInterface(addGeneralInterface).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })
    }
    else { }
  }
  closeModal() {
    this.activeModal.close()
  }

}
