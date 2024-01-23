import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import * as html2pdf from 'html2pdf.js';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-generate-id-card',
  templateUrl: './generate-id-card.component.html',
  styleUrls: ['./generate-id-card.component.scss']
})
export class GenerateIdCardComponent implements OnInit {
  @Input() member:IMembersGetDto;
  imagePath: string="'../../../../../assets/images/profile.jpg'";

  constructor(   
    private commonService: CommonService,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.getImage2()

  }

  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
  async getImage2() {
   
   
    if (this.member && this.member.imagePath != '' && this.member.imagePath != null) {

  
      const imageBlob = await this.http.get(this.getImage(this.member.imagePath!), { responseType: 'blob' }).toPromise();
      console.log(imageBlob)
      const imageUrl = URL.createObjectURL(imageBlob);
      
    
      this.imagePath=  imageUrl;
    } 
  }

  async generatePdf() {   
  
    const cardElement = document.getElementById('card'); 

    if (cardElement) {
      const membername = `${this.member.fullName} Id Card.pdf`;
  
      html2pdf()
        .from(cardElement)
        .set({
          margin: 10, // Set margins (in mm)
          dpi: 300,
          pagebreak: { mode: 'landscape' }, // Set the DPI (dots per inch)
        })
        .save(membername);
    } else {
      // Handle the case where the card element is not found
      console.error('Card element not found.');
    }
  }


  
  

}
