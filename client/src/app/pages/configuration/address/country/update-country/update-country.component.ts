import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CountryGetDto, CountryPostDto } from 'src/app/model/configuration/IcountryDto';
import { ConfigurationService } from 'src/app/services/configuration.service';

import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {

  @Input() Country !: CountryGetDto

  CountryForm!: FormGroup;

  ngOnInit(): void {

    this.CountryForm = this.formBuilder.group({
      countryName: [this.Country.countryName, Validators.required],
      countryCode: [this.Country.countryCode, Validators.required],
      nationality: [this.Country.nationality, Validators.required],
    })
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private messageService: MessageService) {

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.CountryForm.valid) {

      var CountryUpdate: CountryGetDto = {

        id:this.Country.id,
        countryName: this.CountryForm.value.countryName,
        countryCode: this.CountryForm.value.countryCode,
        nationality: this.CountryForm.value.nationality,
      }

      this.configService.updateCountry(CountryUpdate).subscribe({
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

}

