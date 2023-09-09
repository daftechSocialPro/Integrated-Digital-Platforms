import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { RegionPostDto } from 'src/app/model/configuration/IAddressDto';

import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit {


  RegionForm!: FormGroup;
  Countries !:SelectList[] 
  user !: UserView
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getCountriesSelectList()
  }


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private userService: UserService,
    private messageService: MessageService) {

    this.RegionForm = this.formBuilder.group({
      RegionName: ['', Validators.required],
      countryId: ['', Validators.required],
      
    })

  }

  getCountriesSelectList(){

    this.configService.getContriesDropdown().subscribe({
      next:(res)=>{
        this.Countries = res 

      },error:(err)=>{

      }
    })

  }
  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.RegionForm.valid) {

      var RegionPost: RegionPostDto = {

        regionName: this.RegionForm.value.RegionName,
        countryId: this.RegionForm.value.countryId,        
        createdById: this.user.userId

      }

      this.configService.addRegion(RegionPost).subscribe({
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

