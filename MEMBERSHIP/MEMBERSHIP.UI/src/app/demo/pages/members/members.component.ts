import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MemberService } from 'src/app/services/member.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  first: number = 0;
  rows: number = 5;
  Members: IMembersGetDto[];
  paginatedMembers: IMembersGetDto[];
  searchTerm: string = '';
  ngOnInit(): void {
    this.getMemberss();
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: MemberService
  ) {}

  getMemberss() {
    this.controlService.getMembers().subscribe({
      next: (res) => {
        this.Members = res;

        this.paginateMembers();
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateMembers();
  }

  getImagePath(url: string) {
    return this.commonService.createImgPath(url);
  }

  paginateMembers() {
    this.paginatedMembers = this.Members.slice(this.first, this.first + this.rows);
  }

  applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase();

    this.paginatedMembers = this.Members.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.toLowerCase().includes(searchTerm) ||
        item.membershipType.toLowerCase().includes(searchTerm) ||
        (item.region&&item.region.toLowerCase().includes(searchTerm) )||
        item.inistitute.toLowerCase().includes(searchTerm) ||
        (item.instituteRole && item.instituteRole.toLowerCase().includes(searchTerm)) ||
        (item.gender && item.gender.toLowerCase().includes(searchTerm)) ||
        item.paymentStatus.toLowerCase().includes(searchTerm) ||
        item.expiredDate.toString().includes(searchTerm)
      );
    });
    
  }

  goToDetail(member:IMembersGetDto){

    let modalRef = this.modalService.open(MemberDetailComponent,{size:'xxl',backdrop:'static',windowClass: 'custom-modal-width'})
    modalRef.componentInstance.member = member

    modalRef.result.then(()=>{
      this.getMemberss()
    })
  }
}
