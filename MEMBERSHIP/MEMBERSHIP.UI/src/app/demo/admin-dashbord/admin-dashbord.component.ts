// Angular Import
import { Component } from '@angular/core';
import { DashboardContentComponent } from './dashboard-content.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [DashboardContentComponent],
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export default class AdminDashbordComponent {
  constructor() {}
}