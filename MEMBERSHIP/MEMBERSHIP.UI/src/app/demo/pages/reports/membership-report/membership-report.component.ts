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
  filterdMembers: IMembersGetDto[];
  searchTerm: string = '';
  chapters: SelectList[];
  memberships:SelectList[]
  selectedMembership:String =''

  @ViewChild('stockReportIframe') stockReportIframe: ElementRef;
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  selectedChapter: string="";
  selectedGender: string="";
  selectedStatus: string="";
  fromDate: string
  toDate: string

  ngOnInit(): void {
     this.getMemberss();
     
   // this.getMemberReport()
  }

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,  private controlService: MemberService,
    private dropDownService: DropDownService
  ) { }

  getMemberss() {
    this.controlService.getMembers().subscribe({
      next: (res) => {
        this.Members = res;

       this.filterdMembers = res 
      }
    });
  }

  getChapter(value:string) {
    this.dropDownService.getRegionsDropdown(value).subscribe({
      next: (res) => {
        this.chapters = res
      }
    })
  }

  

  getImagePath(url: string) {
    return this.commonService.createImgPath(url);
  }

  // paginateMembers() {
  //   this.paginatedMembers = this.Members.slice(this.first, this.first + this.rows);
  // }
  // paginateMembers2() {
  //   this.paginatedMembers = this.paginatedMembers.slice(this.first, this.first + this.rows);
  // }

  applyFilter() {

    if (this.selectedChapter !== "") {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.filterdMembers = this.Members.filter((item) => {
        return item.region && item.region.toLowerCase().includes(chapterSearchTerm);
      });
    
    }

    if (this.selectedGender !== "") {
      const genderSearchTerm = this.selectedGender.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.gender && (item.gender.toLowerCase()==genderSearchTerm);
      });
      
    }
    
 
    
    if (this.selectedStatus !== "") {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

    
    if (this.selectedMembership !== "") {
      const statusSearchTerm = this.selectedMembership.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.membershipTypeId.toLowerCase()===statusSearchTerm;
      });
    }

    


    if (this.fromDate !== "" && this.toDate!="") {
      const statusSearchTerm = this.selectedStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
      
    }


  
  }

  exportAsExcel(name:string) {
   
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

  // getMemberReport(){
  //   this.controlService.getMembershipReport().subscribe({
     
  //       next: (res) => {

  //         console.log(res)
  //         //const pdfUrl = URL.createObjectURL(res);
  //         //this.stockReportIframe.nativeElement.src = pdfUrl;
  //        }
      
  //   })
  // }

  getRegions(countryType: string) { 
this.getChapter(countryType)
  }

  getMemberships(category: string) {
    this.dropDownService.getMembershipDropDown(category).subscribe({
      next: (res) => {
        this.memberships = res;
      }
    });
  }

  reset(){
    this.filterdMembers = this.Members
  }
}