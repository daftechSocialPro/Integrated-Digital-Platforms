import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralCodeDto } from 'src/app/model/common';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-general-codes',
  templateUrl: './general-codes.component.html',
  styleUrls: ['./general-codes.component.css']
})
export class GeneralCodesComponent implements OnInit {

  generalCodes!: GeneralCodeDto[]

  ngOnInit(): void {

    this.getEducationalLevels()

  }

  constructor(private configService: ConfigurationService, private modalService: NgbModal) { }


  getEducationalLevels() {
    this.configService.getGeneralCodes().subscribe({
      next: (res) => {
        this.generalCodes = res
      }, error: (err) => {
       
      }
    })
  }
 
  



}
