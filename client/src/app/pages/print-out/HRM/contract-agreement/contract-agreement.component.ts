import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContractLetterDto } from 'src/app/model/PrintOuts/IContractLetter.Model';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-contract-agreement',
  templateUrl: './contract-agreement.component.html',
  styleUrls: ['./contract-agreement.component.css']
})
export class ContractAgreementComponent implements OnInit{
  
  contractLetter: ContractLetterDto = {
      contractEndDate: new Date,
      ContractStartDate: new Date,
      employeeAddress: "",
      employeeName: "",
      employeerAddress: "",
      employerName: "",
      grossSalary: 0,
      grossSalaryInWord: "",
      jobTitle: "",
      mobileAllowance: 0,
      mobileAllowanceInWord: "",
      phoneNumber: "",
      placeOfWork: "",
      ReportingTo: "",
      sourceOfFund: "",
      transportAllowance: 0,
      transportAllowanceInWord: "",
      typeOfEmployement : ""
  };

  constructor(private hrmService: HrmService,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer){

  }
  
  ngOnInit(): void {
    let historyId = this.route.snapshot.queryParamMap.get('historyId')?.toString();
    if (historyId) {
      this.hrmService.getContractLetter(historyId).subscribe({
        next: (res) => {
          this.contractLetter = {... res};
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
