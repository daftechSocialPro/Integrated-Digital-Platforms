import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ShiftListDto } from 'src/app/model/HRM/IShiftSettingDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-shift-setting',
  templateUrl: './add-shift-setting.component.html',
  styleUrls: ['./add-shift-setting.component.css']
})

export class AddShiftSettingComponent implements OnInit {


  @Input() shiftSetting!: ShiftListDto

  shiftFormGroup!: FormGroup;
  user !: UserView;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();


    if (this.shiftSetting) {
      this.shiftFormGroup = this.formBuilder.group({
        shiftName: [this.shiftSetting.shiftName, Validators.required],
        amharicShiftName: [this.shiftSetting.amharicShiftName, Validators.required],
        checkIn: [this.shiftSetting.checkIn.split(':').slice(0, 2).join(':'), Validators.required],
        checkOut: [this.shiftSetting.checkOut.split(':').slice(0, 2).join(':'), Validators.required]
      });

    }
    else {

      this.shiftFormGroup = this.formBuilder.group({
        shiftName: ['', Validators.required],
        amharicShiftName: ['', Validators.required],
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required]
      });
    }
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private toastService: CommonService,
    private datePipe: DatePipe,
    private userService: UserService,
    private messageService: MessageService) {


  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.shiftFormGroup.valid) {



     
      if(this.shiftSetting){
        var shiftSettingup: ShiftListDto = {
          id:this.shiftSetting.id,
          shiftName: this.shiftFormGroup.value.shiftName,
          amharicShiftName: this.shiftFormGroup.value.amharicShiftName,
          checkIn: this.datePipe.transform(this.shiftFormGroup.value.checkIn, 'hh:mm:ss'),
          checkOut: this.datePipe.transform(this.shiftFormGroup.value.checkOut, 'hh:mm:ss')
        }

  
  
        this.hrmService.updateShift(shiftSettingup).subscribe({
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
      }else{

       
        var shiftSettingU: ShiftListDto = {
        
          shiftName: this.shiftFormGroup.value.shiftName,
          amharicShiftName: this.shiftFormGroup.value.amharicShiftName,
          checkIn: this.datePipe.transform(this.shiftFormGroup.value.checkIn, 'hh:mm:ss'),
          checkOut: this.datePipe.transform(this.shiftFormGroup.value.checkOut, 'hh:mm:ss'),
          createdById:this.user.userId
         
        }
  
      this.hrmService.addShift(shiftSettingU).subscribe({
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