import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scs-maintain',
  templateUrl: './scs-maintain.component.html',
  styleUrls: ['./scs-maintain.component.scss']
})
export class ScsMaintainComponent implements  OnInit{

  ngOnInit(): void {
    if (window.location.hash === "#list-mailtab-2") {
      // Find the tab element by its ID
      var tabElement = document.getElementById("list-mailtab-2");
      
      // Check if the tab element exists
      if (tabElement) {
        // Trigger a click event on the tab element
        tabElement.click();
      }
    }
 


    
  }


}
