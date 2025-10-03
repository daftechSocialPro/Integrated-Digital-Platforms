import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MemberService } from 'src/app/services/member.service';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { RegisterMembersAdminComponent } from './register-members-admin/register-members-admin.component';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/models/ResponseMessage.Model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  chapters: SelectList[];
  Members: IMembersGetDto[] = [];
  memberships: SelectList[];
  filterdMembers: IMembersGetDto[];
  paginatedMembers: IMembersGetDto[] = [];
  searchTerm: string = '';
  selectedFile: File | null = null;
  user: UserView;

  selectedChapter: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  fromDate: string;
  toDate: string;
  selectedMembership: String = '';
  memberType: string = '';

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  ngOnInit(): void {
    this.getMemberss();
    this.user = this.userService.getCurrentUser();
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService,
    private controlService: MemberService,
    private dropDownService: DropDownService
  ) {}

  getMemberss() {
    this.controlService.getMembers().subscribe({
      next: (res) => {
        if (this.user.role.includes('SuperAdmin')) {
          this.Members = res;
        } else if (this.user.role.includes('RegionAdmin')) {
          this.Members = res.filter((item) => item.regionId == this.user.region);
        }

        this.filterdMembers = this.Members;
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
    this.paginatedMembers = this.filterdMembers.slice(this.first, this.first + this.rows);
  }

  applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase();

    this.paginatedMembers = this.filterdMembers.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.toLowerCase().includes(searchTerm) ||
        (item.memberId && item.memberId.toLocaleLowerCase().includes(searchTerm)) ||
        item.membershipType.toLowerCase().includes(searchTerm) ||
        (item.region && item.region.toLowerCase().includes(searchTerm)) ||
        item.inistitute.toLowerCase().includes(searchTerm) ||
        (item.instituteRole && item.instituteRole.toLowerCase().includes(searchTerm)) ||
        (item.gender && item.gender.toLowerCase().includes(searchTerm)) ||
        item.paymentStatus.toLowerCase().includes(searchTerm) ||
        item.expiredDate.toString().includes(searchTerm)
      );
    });
  }

  goToDetail(member: IMembersGetDto) {
    let modalRef = this.modalService.open(MemberDetailComponent, { size: 'xxl', backdrop: 'static', windowClass: 'custom-modal-width' });
    modalRef.componentInstance.member = member;
    modalRef.result.then(() => {
      this.getMemberss();
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (!this.selectedFile) {
      return;
    }
    this.importFromExcel();
  }
  importFromExcel() {
    const formData = new FormData();
    formData.append('ExcelFile', this.selectedFile);
    this.controlService.importFromExcel(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: res.message, detail: res.data });
          this.getMemberss();
        } else {
          this.messageService.add({ severity: 'error', summary: res.message, detail: res.data });
          this.getMemberss();
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went wrong', detail: err });
      }
    });
  }

  DeleteMember(memberId: string) {
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Member?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteMember(memberId).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMemberss();
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

  RegisterMember() {
    let modalRef = this.modalService.open(RegisterMembersAdminComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(() => {
      this.getMemberss();
    });
  }

  reset() {
    this.filterdMembers = this.Members;
  }
  getRegions(countryType: string) {
    this.getChapter(countryType);
  }

  getChapter(value: string) {
    this.dropDownService.getRegionsDropdown(value).subscribe({
      next: (res) => {
        this.chapters = res;

        if (this.user.regionId != '') {
          this.selectedChapter = this.user.regionId;
        }
      }
    });
  }

  getMemberships(category: string) {
    this.dropDownService.getMembershipDropDown(category).subscribe({
      next: (res) => {
        this.memberships = res;
      }
    });
  }

  applyFilter2() {
    this.filterdMembers = this.Members;
    if (this.selectedChapter !== '') {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.filterdMembers = this.Members.filter((item) => {
        return item.region && item.region.toLowerCase().includes(chapterSearchTerm);
      });
    }

    if (this.selectedGender !== '') {
      const genderSearchTerm = this.selectedGender.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.gender && item.gender.toLowerCase() == genderSearchTerm;
      });
    }

    if (this.selectedStatus !== '') {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

    if (this.selectedMembership !== '') {
      const statusSearchTerm = this.selectedMembership.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.membershipTypeId.toLowerCase() === statusSearchTerm;
      });
    }

    if (this.fromDate !== '' && this.toDate != '') {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

    if (this.memberType != '') {
      const memberTypeSearchTerm = this.memberType.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.memberStatus.toLowerCase().includes(memberTypeSearchTerm);
      });
    }

    this.paginateMembers();
  }

  exportAsExcel(name: string) {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function (s: any) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    const format = function (s: any, c: any) {
      return s.replace(/{(\w+)}/g, function (m: any, p: any) {
        return c[p];
      });
    };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
}
