import { Component, OnInit } from '@angular/core';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-performance-management',
  templateUrl: './performance-management.component.html',
  styleUrls: ['./performance-management.component.css']
})
export class PerformanceManagementComponent implements OnInit {
 
  success!: boolean;
  message!: string;

  constructor(private hrmService: HrmService){

  }
 
  ngOnInit(): void {
    this.getPerformanceTime();
  }


  getPerformanceTime(){
    this.hrmService.getPerformanceTime().subscribe({
      next : (res) => {
        this.success = res.success;
        this.message = res.message;
      }
    });
  }


}
