import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { HrmSettingDto } from 'src/app/model/HRM/IHrmSettingDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-hrm-setting',
  templateUrl: './add-hrm-setting.component.html',
  styleUrls: ['./add-hrm-setting.component.css']
})
export class AddHrmSettingComponent implements OnInit {


  generalHrmSettings!:SelectList[]
  hrmSettingForm!: FormGroup;
  user !: UserView
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()
    
    this.getGeneralSettingDropDown()

   
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private dropDownService : DropDownService,
    private userService : UserService,
    private messageService: MessageService) { 

      this.hrmSettingForm = this.formBuilder.group({
        generalSetting: ['', Validators.required],
        value: ['', Validators.required]
    })
  
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.hrmSettingForm.valid){

      var hrmSettingPost : HrmSettingDto ={
        generalSetting : this.hrmSettingForm.value.generalSetting,
        value : this.hrmSettingForm.value.value,
        createdById : this.user.userId
      }

 
      this.hrmService.addHrmSetting(hrmSettingPost).subscribe({
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

  getGeneralSettingDropDown(){

    this.dropDownService.getGeneralHrmSettings().subscribe({
      next:(res)=>{
        this.generalHrmSettings = res 
   
      }
    })
  }

}
