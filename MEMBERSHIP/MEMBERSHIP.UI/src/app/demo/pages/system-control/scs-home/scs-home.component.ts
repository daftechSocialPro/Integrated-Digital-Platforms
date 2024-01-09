import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';

@Component({
  selector: 'app-scs-home',
  templateUrl: './scs-home.component.html',
  styleUrls: ['./scs-home.component.scss']
})
export class ScsHomeComponent {
// implements OnInit {

//   MeterRates:IMeterSizeRentDto[]
//   first: number = 0;
//   rows: number = 5;
//   paginationMeterRate:IMeterSizeRentDto[];
 
//   ngOnInit(): void {
    
//   }
//   constructor(
//     private activeModal: NgbActiveModal,
//     private messageService: MessageService,
//     private controlService: ScsDataService,
//     private formBuilder: FormBuilder) { }

//     getMeterRates(){
      
//     this.controlService.getMeterSizeRents().subscribe({
//       next:(res)=>{
//         console.log(res)
//         // this.MeterRates = res 
//       }
//     })
//     }
}
