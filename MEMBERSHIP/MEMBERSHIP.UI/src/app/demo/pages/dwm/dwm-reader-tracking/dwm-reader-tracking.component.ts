import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MessageService } from 'primeng/api';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ICustomerCollectedDto } from 'src/models/dwm/ICustomerCollectedDto';
import { IMobileUsersDto } from 'src/models/dwm/IMobileUsersDto';

@Component({
  selector: 'app-dwm-reader-tracking',
  templateUrl: './dwm-reader-tracking.component.html',
  styleUrls: ['./dwm-reader-tracking.component.scss']
})
export class DwmReaderTrackingComponent implements OnInit {
  searchBy: string
  contractNumber: string
  date: string
  userName: string

  mobileUsers: IMobileUsersDto[]

  map: L.Map;
  layerMarkers: L.LayerGroup;
  markerOptions: L.MarkerOptions;
  ngOnInit(): void {
    this.getMobileUsers()
  }

  constructor(
    private messageService: MessageService,
    private datePipe : DatePipe,
    private dwmService: DWMService) { }

  ngAfterViewInit() {
    this.initMap();

    this.layerMarkers = L.layerGroup();
    this.markerOptions = {}
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [9.1450, 40.4897],
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



  getMobileUsers() {
    this.dwmService.getMobileUsers().subscribe({
      next: (res) => {
        this.mobileUsers = res
      }
    })
  }

  filter() {
    if (this.searchBy == '0') {

      this.dwmService.GetBillMobileDataByEntryDate(this.date, this.userName).subscribe({
        next: (res) => {
          this.populateMap(res)
        }
      })



    }
    else if (this.searchBy == '1') {

      this.dwmService.getCustomerCollected(this.contractNumber).subscribe({
        next: (res) => {
          this.populateMap(res)
        }
      })

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select Search' })
    }
  }

  populateMap(result: any) {
   
   
    const latlngs = [];
    this.layerMarkers.clearLayers();
    this.layerMarkers.addTo(this.map);

    const greenIcon = L.icon({
      iconUrl: 'assets/user.png',
      //shadowUrl: 'assets/marker-shadow.png',

      iconSize: [30, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    for (let i = 0; i < result.length; i++) {
      const image = 'data:image/png;base64,' + result[i].readingImage;



      const customPopup = `
        <div style="width: 500px; height: 250px; border-radius: 10px; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden;">
          <div style="display: flex; flex-direction: row;">
            <div style="width: 200px; height: 100%; overflow: hidden;">
              <img style="height: 100%; width: 100%; object-fit: cover;" alt="No Capture" src="${image}">
            </div>
            <div style="padding: 10px;">
              <h4 style="margin: 0;">Customer Details</h4>
              <hr style="margin: 5px 0;">
              <div>
                <span style="font-weight: bold;">Customer Name:</span> ${result[i].customerName}
              </div>
              <div>
                <span style="font-weight: bold;">Contract No:</span> ${result[i].contractNo}
              </div>
              <div>
                <span style="font-weight: bold;">Customer Meter No:</span> ${result[i].meterNo}
              </div>
              <div>
                <span style="font-weight: bold;">Customer Key:</span> ${result[i].custId}
              </div>
              <div>
                <span style="font-weight: bold;">Previous Reading:</span> ${result[i].readingPrev}
              </div>
              <div>
                <span style="font-weight: bold;">Current Reading:</span> ${result[i].readingCurrent}
              </div>
              <div>
                <span style="font-weight: bold;">Fault Code:</span> ${result[i].readingReasonCode}
              </div>
              <div>
                <span style="font-weight: bold;">Reader Name:</span> ${result[i].fullName}
              </div>
              <div>
                <span style="font-weight: bold;">Reader UserName:</span> ${result[i].userName}
              </div>
              <div>
                <span style="font-weight: bold;">Entry DT:</span> ${this.datePipe.transform(result[i].entryDT, 'dd MMM, yyyy')}
              </div>
              <div>
                <span style="font-weight: bold;">Reading DT:</span> ${this.datePipe.transform(result[i].readingDT, 'dd MMM, yyyy')}
              </div>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([parseFloat(result[i].latitude), parseFloat(result[i].longitude)], { icon: greenIcon });
      marker.bindPopup(customPopup).openPopup();
      marker.addTo(this.map);
      marker.addTo(this.layerMarkers);

      const latiC = parseFloat(result[i].latitude);
      const longiC = parseFloat(result[i].longitude);
      latlngs.push([latiC, longiC]);
    }

    const formattedLatLngs = latlngs.map(coords => L.latLng(coords[0], coords[1]));
    L.polyline(formattedLatLngs, { color: 'red' }).addTo(this.map);

  }

  // Add other methods or lifecycle hooks as needed

}
