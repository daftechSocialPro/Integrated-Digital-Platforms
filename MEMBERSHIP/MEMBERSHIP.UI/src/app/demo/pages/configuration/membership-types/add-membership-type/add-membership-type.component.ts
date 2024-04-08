import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { IMembershipTypeGetDto, IMembershipTypePostDto } from 'src/models/configuration/IMembershipDto';

@Component({
  selector: 'app-add-membership-type',
  templateUrl: './add-membership-type.component.html',
  styleUrls: ['./add-membership-type.component.scss']
})
export class AddMembershipTypeComponent implements OnInit {

  @Input() MembershipType:IMembershipTypeGetDto
  
    MembershipTypeForm!: FormGroup;
    user !: UserView
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
  
      if(this.MembershipType){
        this.MembershipTypeForm.controls['name'].setValue(this.MembershipType.name)
        this.MembershipTypeForm.controls['shortCode'].setValue(this.MembershipType.shortCode)        
        this.MembershipTypeForm.controls['description'].setValue(this.MembershipType.description)
        this.MembershipTypeForm.controls['years'].setValue(this.MembershipType.years)
        this.MembershipTypeForm.controls['money'].setValue(this.MembershipType.money)
        this.MembershipTypeForm.controls['currency'].setValue(this.MembershipType.currency)
        this.MembershipTypeForm.controls['category'].setValue(this.MembershipType.membershipCategory)
      }
    }
  
    constructor(
      private activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private configService: ConfigurationService,
      private userService: UserService,
      private messageService: MessageService) {
  
      this.MembershipTypeForm = this.formBuilder.group({
        name: ['', Validators.required],
        shortCode:['',Validators.required],
        description:['',Validators.required],
        years: ['', Validators.required],
        money: ['', Validators.required],
        currency :['',Validators.required],
        category: ['', Validators.required],
      })
  
    }
  
    closeModal() {
      this.activeModal.close();
    }
    submit() {
  
      if (this.MembershipTypeForm.valid) {
  
        var MembershipTypePost: IMembershipTypePostDto = {
  
          name: this.MembershipTypeForm.value.name,
          shortCode:this.MembershipTypeForm.value.shortCode,
          description: this.MembershipTypeForm.value.description,
          years: this.MembershipTypeForm.value.years,
          money: this.MembershipTypeForm.value.money,
          currency: this.MembershipTypeForm.value.currency,
          membershipCategory: this.MembershipTypeForm.value.category,
          createdById: this.user.userId
  
        }
  
        this.configService.addMembershipType(MembershipTypePost).subscribe({
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
  
      if (this.MembershipTypeForm.valid) {
  
        var MembershipTypePost: IMembershipTypePostDto = {
          id:this.MembershipType.id,
          name: this.MembershipTypeForm.value.name,
          shortCode:this.MembershipTypeForm.value.shortCode,
          description: this.MembershipTypeForm.value.description,
          years: this.MembershipTypeForm.value.years,
          money: this.MembershipTypeForm.value.money,
          currency : this.MembershipTypeForm.value.currency,
          membershipCategory: this.MembershipTypeForm.value.category         
  
        }
  
        this.configService.updateMembershipType(MembershipTypePost).subscribe({
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
  
