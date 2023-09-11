import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { ZoneGetDto, ZonePostDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-update-zone',
  templateUrl: './update-zone.component.html',
  styleUrls: ['./update-zone.component.css']
})
export class UpdateZoneComponent implements OnInit {

  @Input() Zone !: ZoneGetDto
  Countries!: SelectList[]
  Regions!: SelectList[]
  ZoneForm!: FormGroup;

  ngOnInit(): void {
    this.getCountriesSelectList()
    this.ZoneForm = this.formBuilder.group({
      zoneName: [this.Zone.zoneName, Validators.required],
      regionId: [this.Zone.regionId, Validators.required],
      countryId: [this.Zone.countryId]

    })
    this.getRegionsSelectList(this.Zone.countryId)

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private messageService: MessageService,
    private dropService: DropDownService
    ) {

  }

  closeModal() {
    this.activeModal.close();
  }
  getCountriesSelectList() {

    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.Countries = res

      }, error: (err) => {

      }
    })


  }
  getRegionsSelectList(countryId: string) {

    this.dropService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.Regions = res
      }, error: (err) => {

      }
    })
  }
  submit() {

    if (this.ZoneForm.valid) {

      var ZoneUpdate: ZonePostDto = {
        id: this.Zone.id,
        zoneName: this.ZoneForm.value.zoneName,
        regionId: this.ZoneForm.value.regionId,

      }

      this.configService.updateZone(ZoneUpdate).subscribe({
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
