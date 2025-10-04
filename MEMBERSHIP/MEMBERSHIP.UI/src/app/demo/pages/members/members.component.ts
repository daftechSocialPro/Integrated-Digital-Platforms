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
import { PaginationRequest, PaginatedResponse } from 'src/models/pagination.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  chapters: SelectList[];
  Members: IMembersGetDto[] = [];
  memberships: SelectList[];
  searchTerm: string = '';
  selectedFile: File | null = null;
  user: UserView;
  loading: boolean = false;

  selectedChapter: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  fromDate: string;
  toDate: string;
  selectedMembership: string = '';
  memberType: string = '';

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  ngOnInit(): void {
    this.loadMembers();
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

  loadMembers() {
    this.loading = true;
    const request: PaginationRequest = {
      pageNumber: Math.floor(this.first / this.rows) + 1,
      pageSize: this.rows,
      searchTerm: this.searchTerm || undefined,
      regionId: this.selectedChapter || undefined,
      gender: this.selectedGender || undefined,
      paymentStatus: this.selectedStatus || undefined,
      membershipTypeId: this.selectedMembership || undefined,
      fromDate: this.fromDate ? new Date(this.fromDate) : undefined,
      toDate: this.toDate ? new Date(this.toDate) : undefined,
      sortBy: 'fullname',
      sortDirection: 'asc'
    };

    // Apply user role filtering
    if (this.user && this.user.role.includes('RegionAdmin')) {
      request.regionId = this.user.region;
    }

    this.controlService.getMembersPaginated(request).subscribe({
      next: (response: PaginatedResponse<IMembersGetDto>) => {
        this.Members = response.data;
        this.totalRecords = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load members'
        });
      }
    });
  }

  getMemberss() {
    this.loadMembers();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadMembers();
  }

  getImagePath(url: string) {
    return this.commonService.createImgPath(url);
  }

  applyFilter() {
    this.first = 0; // Reset to first page when filtering
    this.loadMembers();
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
    this.searchTerm = '';
    this.selectedChapter = '';
    this.selectedGender = '';
    this.selectedStatus = '';
    this.selectedMembership = '';
    this.fromDate = '';
    this.toDate = '';
    this.first = 0;
    this.loadMembers();
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
