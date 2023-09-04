import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user !: UserView
  constructor(@Inject(DOCUMENT) private document: Document,
  private authGuard: AuthGuard,
  private userService: UserService,
  private commonService: CommonService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logOut() {

    this.authGuard.logout();
  }

  createImagePath(url:string){
    return this.commonService.createImgPath(url)
  }
}
