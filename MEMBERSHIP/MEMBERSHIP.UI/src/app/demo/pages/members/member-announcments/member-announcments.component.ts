import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IAnnouncmentGetDto } from 'src/models/configuration/IAnnouncmentDto';
import { AddAnnouncmentComponent } from '../../configuration/announcment/add-announcment/add-announcment.component';

@Component({
  selector: 'app-member-announcments',
  templateUrl: './member-announcments.component.html',
  styleUrls: ['./member-announcments.component.scss']
})
export class MemberAnnouncmentsComponent implements OnInit {
  first: number = 0;
  rows: number = 3;
  Announcment: IAnnouncmentGetDto[];
  paginatedAnnouncment: IAnnouncmentGetDto[];

  ngOnInit(): void {
    this.getAnnouncments();
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: ConfigurationService
  ) {}

  getAnnouncments() {
    this.controlService.getAnnouncment().subscribe({
      next: (res) => {
        this.Announcment = res;

        this.paginateAnnouncment();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateAnnouncment();
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  paginateAnnouncment() {
    this.paginatedAnnouncment = this.Announcment.slice(this.first, this.first + this.rows);
  }
}
