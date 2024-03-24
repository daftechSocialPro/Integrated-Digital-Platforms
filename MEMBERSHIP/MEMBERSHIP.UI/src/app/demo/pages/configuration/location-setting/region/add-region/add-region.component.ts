import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { UserView } from 'src/models/auth/userDto';
import { IRegionGetDto, IRegionPostDto } from 'src/models/configuration/ILocatoinDto';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {

  @Input() Region:IRegionGetDto
  
    RegionForm!: FormGroup;
    countries : SelectList[]
    user !: UserView
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getCountries()
      console.log(this.Region)
  
      if(this.Region){
        this.RegionForm.controls['regionName'].setValue(this.Region.regionName)
        this.RegionForm.controls['countryType'].setValue(this.Region.countryName)

        this.RegionForm.controls['userName'].setValue(this.Region.userName)
        this.RegionForm.controls['password'].setValue(this.Region.password)


       
      }
    }
  
    constructor(
      private activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private configService: ConfigurationService,
      private dropDownService:DropDownService,
      private userService: UserService,
      private messageService: MessageService) {
  
      this.RegionForm = this.formBuilder.group({
        regionName: ['', Validators.required],
        countryType: ['', Validators.required],

        userName :[],
              password:[]
  
      })
  
    }

    getCountries(){
      this.dropDownService.getContriesDropdown().subscribe({
        next:(res)=>{
          this.countries=res
        }
      })
    }
  
    closeModal() {
      this.activeModal.close();
    }
    submit() {
  
      if (this.RegionForm.valid) {
  
        var RegionPost: IRegionPostDto = {
  
          regionName: this.RegionForm.value.regionName,
          countryType: this.RegionForm.value.countryType,        
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
  
    update(){
  
      if (this.RegionForm.valid) {
  
        var RegionPost: IRegionPostDto = {
          id:this.Region.id,
          regionName: this.RegionForm.value.regionName,
          countryType: this.RegionForm.value.countryType, 
          userName :this.RegionForm.value.userName,
          password :this.RegionForm.value.password          
  
        }
  
        this.configService.updateRegion(RegionPost).subscribe({
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
  
