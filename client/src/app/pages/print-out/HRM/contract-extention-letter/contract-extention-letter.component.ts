import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContractExtentionLetterDto } from 'src/app/pages/human-resource/contract-end-employees/extend-contract/extendcontract.model';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-contract-extention-letter',
  templateUrl: './contract-extention-letter.component.html',
  styleUrls: ['./contract-extention-letter.component.css']
})
export class ContractExtentionLetterComponent implements OnInit{
  
  contractExtention: ContractExtentionLetterDto;

  constructor( private route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              public hrmService: HrmService){}
  
  ngOnInit(): void {
    let employeeId = this.route.snapshot.queryParamMap.get('employeeId')?.toString();
    if (employeeId) {
      this.hrmService.getContractExtentionLetter(employeeId).subscribe({
        next: (res) => {
          this.contractExtention = res;
        }
      });
      setTimeout(() => {
        this.print();
      },
        2000);
    }
  }

  print(){
    let printContents: any;
    printContents = document.getElementById('contractLetter')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
  }

}