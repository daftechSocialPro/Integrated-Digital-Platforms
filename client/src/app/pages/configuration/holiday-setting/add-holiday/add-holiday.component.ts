import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddHolidayDto, HolidayListDto } from 'src/app/model/configuration/IHolidayDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent implements OnInit {

  @Input() holidayField !: HolidayListDto;

  holidayFormGroup!: FormGroup;
  user !: UserView


  ngOnInit(): void {
    debugger;
    this.user = this.userService.getCurrentUser();
    if (this.holidayField == null) {
      this.holidayFormGroup = this.formBuilder.group({
        holidayName: ['', Validators.required],
        holidayDate: ['', Validators.required]
      });
    }
    else {
      console.log(this.holidayField)
      this.holidayFormGroup = this.formBuilder.group({
        holidayName: [this.holidayField.holidayName, Validators.required],
        holidayDate: [this.holidayField.holidayDate, Validators.required],
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private userService: UserService,
    private messageService: MessageService) {
  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {
    if (this.holidayFormGroup.valid) {

      var addHolidayDto: AddHolidayDto = {
        holidayName: this.holidayFormGroup.value.holidayName,
        holidayDate: this.holidayFormGroup.value.holidayDate,
        createdById: this.user.userId
      }
      if(this.holidayField != null){
        addHolidayDto.id = this.holidayField.id
      }

      if(addHolidayDto.id == null){
        this.configService.addHoliday(addHolidayDto).subscribe({
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
        });
      }
      else{
        this.configService.updateHoliday(addHolidayDto).subscribe({
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
        });
      }
    }

  }

}