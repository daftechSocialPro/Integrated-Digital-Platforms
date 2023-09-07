import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionGetDto } from 'src/app/model/configuration/IAddressDto';

import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddRegionComponent } from './add-region/add-region.component';
import { UpdateRegionComponent } from './update-region/update-region.component';


@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  
  Regions! : RegionGetDto[]

  ngOnInit(): void {

    this.getRegions()
    
  }

  constructor (private configService : ConfigurationService,private modalService:NgbModal){}


  getRegions (){
    this.configService.getRegions().subscribe({
      next:(res)=>{      
          this.Regions = res       
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addRegion(){

    let modalRef = this.modalService.open(AddRegionComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getRegions()
    })
  }

  updateRegion (Region :RegionGetDto){


    let modalRef = this.modalService.open(UpdateRegionComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.Region = Region

    modalRef.result.then(()=>{

      this.getRegions()
    })

  }




}
