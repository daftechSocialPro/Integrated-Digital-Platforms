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

}
