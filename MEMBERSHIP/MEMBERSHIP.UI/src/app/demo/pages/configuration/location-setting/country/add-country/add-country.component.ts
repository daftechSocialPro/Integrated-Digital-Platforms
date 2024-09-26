import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { ICountryGetDto, ICountryPostDto } from 'src/models/configuration/ILocatoinDto';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

@Input() Country:ICountryGetDto

  CountryForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

    if(this.Country){
      this.CountryForm.controls['countryName'].setValue(this.Country.countryName)
      this.CountryForm.controls['countryCode'].setValue(this.Country.countryCode)
      this.CountryForm.controls['nationality'].setValue(this.Country.nationality)
    }
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

      var CountryPost: ICountryPostDto = {

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

  update(){

    if (this.CountryForm.valid) {

      var CountryPost: ICountryPostDto = {
        id:this.Country.id,
        countryName: this.CountryForm.value.countryName,
        countryCode: this.CountryForm.value.countryCode,
        nationality: this.CountryForm.value.nationality,
        

      }

      this.configService.updateCountry(CountryPost).subscribe({
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
