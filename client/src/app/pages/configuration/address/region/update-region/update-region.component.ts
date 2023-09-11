import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList } from 'src/app/model/common';
import { RegionGetDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.css']
})
export class UpdateRegionComponent implements OnInit {

  @Input() Region !: RegionGetDto
  Countries!:SelectList[]
  RegionForm!: FormGroup;

  ngOnInit(): void {
    this.getCountriesSelectList()
    this.RegionForm = this.formBuilder.group({
      regionName: [this.Region.regionName, Validators.required],
      countryId: [this.Region.countryId, Validators.required],
    
    })
  
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private messageService: MessageService,
    private dropService: DropDownService) {

  }

  closeModal() {
    this.activeModal.close();
  }
  getCountriesSelectList(){

    this.dropService.getContriesDropdown().subscribe({
      next:(res)=>{
        this.Countries = res 

      },error:(err)=>{

      }
    })

  }
  submit() {

    if (this.RegionForm.valid) {

      var RegionUpdate: RegionGetDto = {

        id:this.Region.id,
        regionName: this.RegionForm.value.regionName,
        countryId: this.RegionForm.value.countryId,
        
       
      }

      this.configService.updateRegion(RegionUpdate).subscribe({
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