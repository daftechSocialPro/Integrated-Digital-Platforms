import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GetEmployeeGuaranteeDto } from 'src/app/pages/human-resource/employee-managment/employee-detail/employee-guarantee/employee-guarantee.model';

@Component({
  selector: 'app-guarantee-letter',
  templateUrl: './guarantee-letter.component.html',
  styleUrls: ['./guarantee-letter.component.css']
})
export class GuaranteeLetterComponent implements OnInit{
  
  guarantee: GetEmployeeGuaranteeDto;

  constructor( private route: ActivatedRoute,
              public sanitizer: DomSanitizer){}
  
  ngOnInit(): void {
    const dataString = this.route.snapshot.queryParamMap.get('data');
    let myObject = dataString ? JSON.parse(dataString) : null;
    this.guarantee = myObject;
    setTimeout(() => {
      this.print();
    },
      2000);
  }

  print(){
    let printContents: any;
    printContents = document.getElementById('contractLetter')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
  }

}
