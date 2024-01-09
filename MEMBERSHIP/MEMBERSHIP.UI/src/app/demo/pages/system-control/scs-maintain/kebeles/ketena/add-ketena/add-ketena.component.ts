import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IKetenaDto } from 'src/models/system-control/IKetenaDto';

@Component({
  selector: 'app-add-ketena',
  templateUrl: './add-ketena.component.html',
  styleUrls: ['./add-ketena.component.scss']
})
export class AddKetenaComponent implements OnInit {

  @Input() Ketena: IKetenaDto
  KetenaForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.Ketena) {
      this.KetenaForm = this.formBuilder.group({
        ketenaCode: [this.Ketena.ketenaCode, Validators.required],
        ketenaName: [this.Ketena.ketenaName, Validators.required],
      })
    }
    else {
      this.KetenaForm = this.formBuilder.group({

        ketenaCode: ['', Validators.required],
        ketenaName: ['', Validators.required],


      })
    }


  }

  submit() {

    if (this.KetenaForm.valid) {

      let addKetena: IKetenaDto = {
        ketenaCode: this.KetenaForm.value.ketenaCode,
        ketenaName: this.KetenaForm.value.ketenaName,

      }

      this.controlService.addKetena(addKetena).subscribe({
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
    if (this.KetenaForm.valid) {

      let addKetena: IKetenaDto = {
        ketenaCode: this.KetenaForm.value.ketenaCode,
        ketenaName: this.KetenaForm.value.ketenaName,

      }

      this.controlService.updateKetena(addKetena).subscribe({
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

  closeModal() {

    this.activeModal.close()

  }

}
