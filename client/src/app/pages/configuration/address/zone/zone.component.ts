import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneGetDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { UpdateZoneComponent } from './update-zone/update-zone.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  
  Zones! : ZoneGetDto[]

  ngOnInit(): void {

    this.getZones()
    
  }

  constructor (private configService : ConfigurationService,private modalService:NgbModal){}


  getZones (){
    this.configService.getZones().subscribe({
      next:(res)=>{      
          this.Zones = res       
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addZone(){

    let modalRef = this.modalService.open(AddZoneComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getZones()
    })
  }

  updateZone (Zone :ZoneGetDto){


    let modalRef = this.modalService.open(UpdateZoneComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.Zone = Zone

    modalRef.result.then(()=>{

      this.getZones()
    })

  }




}

