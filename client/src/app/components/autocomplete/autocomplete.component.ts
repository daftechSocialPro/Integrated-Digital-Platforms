import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectList } from 'src/app/model/common';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {

  @Input() data: SelectList[] = [];
  @Input() selectedId!: string;
  @Input() placeHolder!:string;

  placeholder!: String;
  selectedValue: any

  @Output() selectedItem = new EventEmitter<any>();


  selectEvent(item: string) {

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

    if (key[0] != null) {
      this.placeholder = key[0].name
      this.selectEvent(key[0].id)
    }   
    
  }

}

