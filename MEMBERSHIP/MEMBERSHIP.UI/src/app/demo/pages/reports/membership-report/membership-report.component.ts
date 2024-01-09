import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersGetDto } from 'src/models/auth/membersDto';

@Component({
  selector: 'app-membership-report',
  templateUrl: './membership-report.component.html',
  styleUrls: ['./membership-report.component.scss']
})
export class MembershipReportComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  Members: IMembersGetDto[];
  paginatedMembers: IMembersGetDto[];
  searchTerm: string = '';
  chapters: SelectList[];

  @ViewChild('stockReportIframe') stockReportIframe: ElementRef;

  selectedChapter: string="";
  selectedGender: string="";
  selectedStatus: string="";
  fromDate: string
  toDate: string

  ngOnInit(): void {
    // this.getMemberss();
    // this.getChapter()
    this.getMemberReport()
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: MemberService,
    private dropDownService: DropDownService
  ) { }

  getMemberss() {
    this.controlService.getMembers().subscribe({
      next: (res) => {
        this.Members = res;

        this.paginateMembers();
      }
    });
  }

  getChapter() {
    this.dropDownService.getRegionsDropdown('ETHIOPIAN').subscribe({
      next: (res) => {
        this.chapters = res
      }
    })
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

    if (this.selectedGender !== "") {
      const genderSearchTerm = this.selectedGender.toLowerCase();
      this.paginatedMembers = this.Members.filter((item) => {
        return item.gender && item.gender.toLowerCase().includes(genderSearchTerm);
      });
    }
    
    if (this.selectedChapter !== "") {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.paginatedMembers = this.paginatedMembers.filter((item) => {
        return item.region && item.region.toLowerCase().includes(chapterSearchTerm);
      });
    }
    
    if (this.selectedStatus !== "") {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.paginatedMembers = this.paginatedMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }


    if (this.fromDate !== "" && this.toDate!="") {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.paginatedMembers = this.paginatedMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

  }



  getMemberReport(){
    this.controlService.getMembershipReport().subscribe({
     
        next: (res) => {

          console.log(res)
          //const pdfUrl = URL.createObjectURL(res);
          //this.stockReportIframe.nativeElement.src = pdfUrl;
         }
      
    })
  }
}