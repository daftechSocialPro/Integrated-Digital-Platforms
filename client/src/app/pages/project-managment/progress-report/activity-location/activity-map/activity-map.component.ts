import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import { ActivityMaps } from 'src/app/model/PM/ActivityViewDto';
@Component({
  selector: 'app-activity-map',
  templateUrl: './activity-map.component.html',
  styleUrls: ['./activity-map.component.css']
})
export class ActivityMapComponent implements OnInit {

  ngOnInit(): void {
    
    console.log(this.activtYMaps)
  }

  @Input() activtYMaps! :ActivityMaps[]
  @ViewChild('modalContent') modalContent!: ElementRef;
  lat :number=9.1450
  lng :number=40.4897
  private map!: L.Map; 


  constructor(private activeModal:NgbActiveModal) {}

  ngAfterViewInit() {
    this.initMap();
    this.addMarkers()
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 6
    });

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                   '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    });

    tileLayer.addTo(this.map);
    
  }

  addMarkers (){

    this.activtYMaps.forEach(element => {
      const greenIcon = L.icon({
        iconUrl: 'assets/marker-icon-green.png',
        //shadowUrl: 'assets/marker-shadow.png',
      
        iconSize: [41, 35],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      const marker = L.marker([element.lat,element.lng], { icon: greenIcon }).addTo(this.map);

      
      marker.bindPopup(`${element.activityNumber},(${element.projectLocation})`);
      
    });
   
  }
  closeModal(){

        this.activeModal.close()
      }

      printModal() {
        const printContent = this.modalContent.nativeElement.innerHTML;
        const originalContent = document.body.innerHTML;
    
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
      }
}





