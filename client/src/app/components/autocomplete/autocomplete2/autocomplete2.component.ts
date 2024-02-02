import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectList } from 'src/app/model/common';

@Component({
  selector: 'app-autocomplete2',
  templateUrl: './autocomplete2.component.html',
  styleUrls: ['./autocomplete2.component.css']
})
export class Autocomplete2Component {

  @Input() data: SelectList[] = [];
  @Input() selectedId!: string;
  @Input() placeHolder!:string;
  @Input() isDisabled : boolean = false
  placeholder!: String;
  selectedValue: any



  @Output() selectedItem = new EventEmitter<any>();


  selectEvent(item: any) {


    this.selectedItem.emit(item)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
  constructor() { }

  ngOnInit() {

    let key = this.data.filter(t => t.id === this.selectedId)
    console.log("key",key)
    if (key[0] != null) {   
      this.placeHolder = key[0].name
      this.selectEvent(key[0])    
    }  
  }



}