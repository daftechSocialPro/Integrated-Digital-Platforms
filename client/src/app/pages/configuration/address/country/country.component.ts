import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryGetDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HrmService } from 'src/app/services/hrm.service';
import { AddCountryComponent } from '../../address/country/add-country/add-country.component';
import { UpdateCountryComponent } from '../../address/country/update-country/update-country.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  
  Countries! : CountryGetDto[]

  ngOnInit(): void {

    this.getCountrys()
    
  }

  constructor (private configService : ConfigurationService,private modalService:NgbModal){}


  getCountrys (){
    this.configService.getCountries().subscribe({
      next:(res)=>{
      
          this.Countries = res
        
      
      },error:(err)=>{
       
      }
    })
  }
  addCountry(){

    let modalRef = this.modalService.open(AddCountryComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getCountrys()
    })
  }

  updateCountry (Country :CountryGetDto){


    let modalRef = this.modalService.open(UpdateCountryComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.Country = Country

    modalRef.result.then(()=>{

      this.getCountrys()
    })

  }




}
