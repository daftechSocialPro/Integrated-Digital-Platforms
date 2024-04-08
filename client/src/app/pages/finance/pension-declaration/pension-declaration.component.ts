import { Component } from '@angular/core';

@Component({
  selector: 'app-pension-declaration',
  templateUrl: './pension-declaration.component.html',
  styleUrls: ['./pension-declaration.component.css']
})
export class PensionDeclarationComponent {
  employee!: string
  Pariod!: string
  fiscalYear: string ="2016"
  Taxlogo!: string



  constructor(

  ){}

  printReport(){
    window.print()
  }

  closeReport(){
    
  }


}
