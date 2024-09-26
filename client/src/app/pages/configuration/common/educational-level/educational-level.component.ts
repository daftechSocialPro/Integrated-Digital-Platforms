import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationService } from 'src/app/services/configuration.service';

import { EducationalLevelGetDto } from 'src/app/model/configuration/ICommonDto';
import { AddEdcuationalLevelComponent } from './add-edcuational-level/add-edcuational-level.component';
import { UpdateEdcuationalLevelComponent } from './update-edcuational-level/update-edcuational-level.component'
@Component({
  selector: 'app-educational-level',
  templateUrl: './educational-level.component.html',
  styleUrls: ['./educational-level.component.css']
})
export class EducationalLevelComponent implements OnInit {

  EducationalLevels!: EducationalLevelGetDto[]

  ngOnInit(): void {

    this.getEducationalLevels()

  }

  constructor(private configService: ConfigurationService, private modalService: NgbModal) { }


  getEducationalLevels() {
    this.configService.getEducationaslLevels().subscribe({
      next: (res) => {

        this.EducationalLevels = res


      }, error: (err) => {
       
      }
    })
  }
  addEducationalLevel() {

    let modalRef = this.modalService.open(AddEdcuationalLevelComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {

      this.getEducationalLevels()
    })
  }

  updateEducationalLevel(EducationalLevel: EducationalLevelGetDto) {


    let modalRef = this.modalService.open(UpdateEdcuationalLevelComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.EducationalLevel = EducationalLevel

    modalRef.result.then(() => {

      this.getEducationalLevels()
    })

  }




}


