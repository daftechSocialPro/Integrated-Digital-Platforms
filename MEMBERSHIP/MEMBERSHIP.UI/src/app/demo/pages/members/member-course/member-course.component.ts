import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { ICourseGetDto } from 'src/models/configuration/ICourseDto';
import { EventDescriptionComponent } from '../../configuration/event-description/event-description.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-course',
  templateUrl: './member-course.component.html',
  styleUrls: ['./member-course.component.scss']
})
export class MemberCourseComponent implements OnInit {
  first: number = 0;
  rows: number = 3;
  Course: ICourseGetDto[];
  paginatedCourse: ICourseGetDto[];
  member: IMembersGetDto;
  userview: UserView;
  ngOnInit(): void {
    this.userview = this.userService.getCurrentUser();
    this.getSingleMember();
  }

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private memberService: MemberService,
    private router:Router,
    private modalService : NgbModal,
    private controlService: ConfigurationService
  ) {}

  getSingleMember() {
    this.memberService.getSingleMember(this.userview.loginId).subscribe({
      next: (res) => {
        this.member = res;
        this.getCourses(res.membershipTypeId);
      }
    });
  }

  getCourses(membershipTypeId: string) {
    this.controlService.getCourses(membershipTypeId).subscribe({
      next: (res) => {
        this.Course = res;

        this.paginateCourse();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateCourse();
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  paginateCourse() {
    this.paginatedCourse = this.Course.slice(this.first, this.first + this.rows);
  }

  getDescription(event:ICourseGetDto){

    
    this.router.navigate(['configuration/event-detail', event.id]);
  }
}
