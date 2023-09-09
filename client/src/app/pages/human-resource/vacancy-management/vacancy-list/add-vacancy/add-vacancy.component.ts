import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddVacancyDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit{

  vacancyForm!: FormGroup;
  positionDropDown: SelectList[] = [];
  departementDropDown: SelectList[] = [];
  vacancyType: any[] = [
    { value: 0, name: "INTERNAL" },
    { value: 1, name: "EXTERNAL" },
    { value: 2, name: "BOTH" },
  ];

  constructor(private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, private configService: ConfigurationService)
  {}    
  
  
  
  ngOnInit() {
    this.initVacancyForm();
  }

  initVacancyForm() {
    this.vacancyForm = this.formBuilder.group({
      vacancyName: ['', Validators.required],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
      vaccancyDescription: ['',],
      educationalLevelId: ['', Validators.required],
      educationalFieldId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      employmentType: ['', Validators.required],
      vaccancyStartDate: ['', Validators.required],
      vaccancyEndDate: ['', Validators.required],
      gPA: ['', Validators.pattern('^[0-9]+$')],
      vacancyType: ['', Validators.required]
    });
  }

  getDropValues(){
    this.configService.getRegionsDropdown
  }

}
