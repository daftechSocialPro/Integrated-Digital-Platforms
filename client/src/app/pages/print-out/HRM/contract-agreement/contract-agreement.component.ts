import { Component, OnInit } from '@angular/core';
import { ContractLetterDto } from 'src/app/model/PrintOuts/IContractLetter.Model';

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

  constructor(){

  }
  
  ngOnInit(): void {
    
  }

}
