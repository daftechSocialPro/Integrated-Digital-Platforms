import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';

import { ProjectLocationGetDto, ProjectLocationPostDto } from 'src/app/model/PM/ProjectLocationDto';
import { ConfigurationService } from 'src/app/services/configuration.service';

import * as L from 'leaflet';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/app/model/common';

@Component({
  selector: 'app-add-project-location',
  templateUrl: './add-project-location.component.html',
  styleUrls: ['./add-project-location.component.css']
})
export class AddProjectLocationComponent implements OnInit {
  @Input() lat !: number
  @Input() lng !: number
  private map!: L.Map;
  marker!: L.Marker;
  fiscalYears : SelectList[]
  @Input() calledFrom!:number 

  projectLocationForm!: FormGroup

  @Input() projectLocation!: ProjectLocationGetDto




  constructor(private formBuilder: FormBuilder,
    private configurationService: ConfigurationService,
    private dropDownService : DropDownService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {


 
    if (this.projectLocation) {
      this.projectLocationForm = this.formBuilder.group({
        name: [this.projectLocation.name, Validators.required],    
        budget:[this.projectLocation.budget,Validators.required]

      });
     
      this.initMap()
      const greenIcon = L.icon({
        iconUrl: 'assets/marker-icon-green.png',
        iconSize: [41, 35],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = L.marker([this.lat, this.lng], { icon: greenIcon }).addTo(this.map);
    }
    else {
      this.projectLocationForm = this.formBuilder.group({
        name: ['', Validators.required],
      
        budget:['',Validators.required]

      });
      this.lat = 9.1450
      this.lng = 40.4897
      this.initMap()
    }






  }

  submit() {

    if(this.projectLocation){
      if (this.projectLocationForm.valid) {

        var projectLocationput: ProjectLocationGetDto = {
  
          id:this.projectLocation.id,
          name: this.projectLocationForm.value.name,
        
          budget:this.projectLocationForm.value.budget
         
          // type : this.projectLocationForm.value.type
  
        }
  
  
        this.configurationService.updateProjectLocation(projectLocationput).subscribe({
  
          next: (res) => {
  
            if (res.success) {
  
              console.log(res)
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
  
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
  
            }
  
  
          }, error: (err) => {
  
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
  
  
          }
        }
        );
      }

    }else{

    if ((this.lat === 9.1450 || this.lng === 40.4897 )&& false) {

      this.messageService.add({ severity: 'error', summary: 'Map Error', detail: "Please Click a location from a map !!!" });

      return
    }

    if (this.projectLocationForm.valid) {

      var projectLocationpost: ProjectLocationPostDto = {

        name: this.projectLocationForm.value.name,
   
        budget:this.projectLocationForm.value.budget
  
        // type : this.projectLocationForm.value.type

      }


      this.configurationService.addProjectLocation(projectLocationpost).subscribe({

        next: (res) => {

          if (res.success) {

            console.log(res)
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }


        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });


        }
      }
      );
    }
  }
  }

  onMapClick(e: L.LeafletMouseEvent): void {
    const latlng = e.latlng;
    this.lat = latlng.lat;
    this.lng = latlng.lng;
    console.log('Latitude: ' + this.lat + ', Longitude: ' + this.lng);

    const greenIcon = L.icon({
      iconUrl: 'assets/marker-icon-green.png',
      iconSize: [41, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([this.lat, this.lng], { icon: greenIcon }).addTo(this.map);
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 5
    });;

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    });

    tileLayer.addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }
  closeModal() {

    this.activeModal.close()
  }

  submitMap(){

    
    this.activeModal.close({
      lat:this.lat,
      lng:this.lng
    })
  }

}
