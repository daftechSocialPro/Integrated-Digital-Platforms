import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  
  roleMatch (value : string[]){
    return this.userService.roleMatch(value)
      }
    

}
