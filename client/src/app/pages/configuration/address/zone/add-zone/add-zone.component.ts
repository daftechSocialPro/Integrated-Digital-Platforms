import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { ZonePostDto } from 'src/app/model/configuration/IAddressDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent implements OnInit {


  ZoneForm!: FormGroup;
  Countries !:SelectList[] 
  Regions !: SelectList[]
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
    private messageService: MessageService,
    private dropService: DropDownService) {

    this.ZoneForm = this.formBuilder.group({
      zoneName: ['', Validators.required],
      regionId: ['', Validators.required],
      
    })

  }

  getCountriesSelectList(){

    this.dropService.getContriesDropdown().subscribe({
      next:(res)=>{
        this.Countries = res 

      },error:(err)=>{

      }
    })

  }

  getRegionsSelectList (countryId : string ){

    this.dropService.getRegionsDropdown(countryId).subscribe({
      next:(res)=>{
        this.Regions = res 
      },error:(err)=>{
        
      }
    })
  }
  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.ZoneForm.valid) {

      var ZonePost: ZonePostDto = {

        zoneName: this.ZoneForm.value.zoneName,
        regionId: this.ZoneForm.value.regionId,        
        createdById: this.user.userId

      }

      this.configService.addZone(ZonePost).subscribe({
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
