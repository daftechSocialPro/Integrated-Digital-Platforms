import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';
import { IGeneralOptionsDto } from 'src/models/system-control/IGeneralOptionsDto';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  optionForm !: FormGroup
  generalOption:IGeneralOptionsDto
  items: MenuItem[] | undefined;

  activeIndex: number = 0;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder, 
    private setupService:ScsSetupService) { }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'General',
        
      },
      {
        label: 'Customer',
      },
      {
        label: 'Bill',
      }
      
    ];
    this.getGeneralOption()

    this.optionForm = this.formBuilder.group({

      option01: ['', Validators.required],
      option02: ['', Validators.required],
      option03: ['', Validators.required],
      option04: ['', Validators.required],
      option05: ['', Validators.required],
      option06: ['', Validators.required],
      option07: ['', Validators.required],
    });
  }

  getGeneralOption(){
    this.setupService.getGeneralOptions().subscribe({
      next:(res)=>{
        this.generalOption =res

        if (this.generalOption){
          this.optionForm.controls['option01'].setValue(this.generalOption.option01)
          this.optionForm.controls['option02'].setValue(this.generalOption.option02)
          this.optionForm.controls['option03'].setValue(this.generalOption.option03)
          this.optionForm.controls['option04'].setValue(this.generalOption.option04)
          this.optionForm.controls['option05'].setValue(this.generalOption.option05)
          this.optionForm.controls['option06'].setValue(this.generalOption.option06)
          this.optionForm.controls['option07'].setValue(this.generalOption.option07==='YES')
        }
        
      }
    })
  }

}
