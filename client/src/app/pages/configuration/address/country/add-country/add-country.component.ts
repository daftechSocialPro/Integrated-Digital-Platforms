import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CountryPostDto } from 'src/app/model/configuration/IAddressDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {


  CountryForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private userService: UserService,
    private messageService: MessageService) {

    this.CountryForm = this.formBuilder.group({
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
      nationality: ['', Validators.required],

    })

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.CountryForm.valid) {

      var CountryPost: CountryPostDto = {

        countryName: this.CountryForm.value.countryName,
        countryCode: this.CountryForm.value.countryCode,
        nationality: this.CountryForm.value.nationality,
        createdById: this.user.userId

      }

      this.configService.addCountry(CountryPost).subscribe({
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

