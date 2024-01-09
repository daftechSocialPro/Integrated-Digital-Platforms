import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { GenerateIdCardComponent } from '../generate-id-card/generate-id-card.component';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-members-dashboard',

  templateUrl: './members-dashboard.component.html',
  styleUrls: ['./members-dashboard.component.scss']
})
export class MembersDashboardComponent implements OnInit {

  member: IMembersGetDto
  user: UserView
  viewId = false
  daysLeft = 0
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getMembers()
  }

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private memberService: MemberService
  ) { }

  getMembers() {

    this.memberService.getSingleMember(this.user.loginId).subscribe({
      next: (res) => {

        this.member = res
        this.getDaysLeft(this.member.expiredDate)

      }
    })
  }

  generateIdCard(viewId) {
    this.viewId = !viewId
  }

  requestIdCard() {

    this.memberService.changeIdCardStatus(this.member.id, 'REQUESTED', '').subscribe({
      next: (res) => {

        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
          this.getMembers()
        } else {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!.', detail: res.message });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err.message });

        console.log(err);
      }
    })
  }

  getDaysLeft(expiredDate: Date) {
    const expirationDate = new Date(expiredDate); // Replace with your actual expiration date

    // Calculate the number of milliseconds between today and the expiration date
    const timeDiff = expirationDate.getTime() - Date.now();

    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    this.daysLeft = daysLeft

    console.log(this.daysLeft)
  }
  generatePdf() {
    const element = document.getElementById('card'); // Replace 'card' with the ID of your card element
  
    html2pdf()
      .from(element)
      .save('card.pdf');
  }
}
