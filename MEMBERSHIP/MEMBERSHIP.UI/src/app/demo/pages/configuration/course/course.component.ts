import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';

import { IMembershipTypeGetDto } from 'src/models/configuration/IMembershipDto';
import { AddCourseComponent } from './add-course/add-course.component';
import { CommonService } from 'src/app/services/common.service';
import { ICourseGetDto } from 'src/models/configuration/ICourseDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() MembershipType: IMembershipTypeGetDto;

  first: number = 0;
  rows: number = 5;
  Course: ICourseGetDto[];
  paginatedCourse: ICourseGetDto[];

  ngOnInit(): void {
    this.getCourses();
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private router : Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ConfigurationService
  ) {}

  getCourses() {
    this.controlService.getCourses(this.MembershipType.id).subscribe({
      next: (res) => {
        this.Course = res;

        this.paginateCourse();
      }
    });
  }

  addCourse() {
    let modalRef = this.modalService.open(AddCourseComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.MemberShipTypeId = this.MembershipType.id;
    modalRef.result.then(() => {
      this.getCourses();
    });
  }

  removeCourse(CourseId: string) {
    console.log(CourseId);
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Course?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteCourse(CourseId).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getCourses();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
  }

  updateCourse(Course: ICourseGetDto) {
    let modalRef = this.modalService.open(AddCourseComponent, { size: 'lg', backdrop: 'static' });

    modalRef.componentInstance.Course = Course;

    modalRef.result.then(() => {
      this.getCourses();
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateCourse();
  }

  paginateCourse() {
    this.paginatedCourse = this.Course.slice(this.first, this.first + this.rows);
  }

  closeModal() {
    this.activeModal.close();
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  detail(eventId : string ){
    this.closeModal()

    this.router.navigate(['configuration/event-detail', eventId]);
  }
}
