import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-generate-id-card',
  templateUrl: './generate-id-card.component.html',
  styleUrls: ['./generate-id-card.component.scss']
})
export class GenerateIdCardComponent implements OnInit {
  @Input() member;
  imagePath: any;

  constructor(
   
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    console.log('member', this.member);
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
  getImage2() {
    if (this.imagePath != null && this.imagePath != '') {
      return this.imagePath;
    }
    if (this.member && this.member.imagePath != '' && this.member.imagePath != null) {
      return this.getImage(this.member.imagePath!);
    } else {
      return '../../../../../assets/images/profile.jpg';
    }
  }

  generatePdf() {
    const element = document.getElementById('card'); // Replace 'card' with the ID of your card element
  
    html2pdf()
      .from(element)
      .save('card.pdf');
  }

}
