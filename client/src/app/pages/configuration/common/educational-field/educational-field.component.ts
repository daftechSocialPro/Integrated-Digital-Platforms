import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducationalFieldGetDto } from 'src/app/model/configuration/ICommonDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddEdcuationalFieldComponent } from './add-edcuational-field/add-edcuational-field.component';
import { UpdateEductionalFieldComponent } from './update-eductional-field/update-eductional-field.component';

@Component({
  selector: 'app-educational-field',
  templateUrl: './educational-field.component.html',
  styleUrls: ['./educational-field.component.css']
})
export class EducationalFieldComponent implements OnInit {
  
  educationalFields! : EducationalFieldGetDto[]

  ngOnInit(): void {

    this.getEducationalFields()
    
  }

  constructor (private configService : ConfigurationService,private modalService:NgbModal){}


  getEducationalFields (){
    this.configService.getEducationaslFields().subscribe({
      next:(res)=>{
      
          this.educationalFields = res
        
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addEducationalField(){

    let modalRef = this.modalService.open(AddEdcuationalFieldComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getEducationalFields()
    })
  }

  updateEducationalField (EducationalField :EducationalFieldGetDto){


    let modalRef = this.modalService.open(UpdateEductionalFieldComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.EducationalField = EducationalField

    modalRef.result.then(()=>{

      this.getEducationalFields()
    })

  }




}

