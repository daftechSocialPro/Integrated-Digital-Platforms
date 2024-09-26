import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  constructor(private userService: UserService,) { }

  ngOnInit(): void {


  }
  roleMatch(value: string[]) {
    return this.userService.roleMatch(value)
  }

}
