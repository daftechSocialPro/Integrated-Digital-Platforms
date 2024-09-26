import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { UserView } from 'src/models/auth/userDto';
import { IZoneGetDto, IZonePostDto } from 'src/models/configuration/ILocatoinDto';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {

  @Input() Zone:IZoneGetDto
  
    ZoneForm!: FormGroup;
    countries : SelectList[]
    regions: SelectList[]
    
    user !: UserView
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getCountries()
  
      if(this.Zone){
        this.ZoneForm.controls['zoneName'].setValue(this.Zone.zoneName)
        this.ZoneForm.controls['countryId'].setValue(this.Zone.countryId)        
        this.ZoneForm.controls['regionId'].setValue(this.Zone.regionId)

        this.getRegions()
     
      }
    }
  
    constructor(
      private activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private configService: ConfigurationService,
      private dropDownService:DropDownService,
      private userService: UserService,
      private messageService: MessageService) {
  
      this.ZoneForm = this.formBuilder.group({
        zoneName: ['', Validators.required],
        regionId: ['', Validators.required],
        countryId: ['', Validators.required],
  
      })
  
    }

    getCountries(){
      this.dropDownService.getContriesDropdown().subscribe({
        next:(res)=>{
          this.countries=res
        }
      })
    }
    getRegions(){
      var selectedCountry = this.ZoneForm.value.countryId
      this.dropDownService.getRegionsDropdown(selectedCountry).subscribe({
        next:(res)=>{
          this.regions=res
        }
      })
    }
  
    closeModal() {
      this.activeModal.close();
    }
    submit() {
  
      if (this.ZoneForm.valid) {
  
        var ZonePost: IZonePostDto = {
  
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
  
    update(){
  
      if (this.ZoneForm.valid) {
  
        var ZonePost: IZonePostDto = {
          id:this.Zone.id,
          zoneName: this.ZoneForm.value.zoneName,
          regionId: this.ZoneForm.value.regionId, 
          
  
        }
  
        this.configService.updateZone(ZonePost).subscribe({
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
  
