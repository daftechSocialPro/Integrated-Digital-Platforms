import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { SelectList } from 'src/app/model/common';

@Component({
  selector: 'app-autocomplete2',
  templateUrl: './autocomplete2.component.html',
  styleUrls: ['./autocomplete2.component.css']
})
export class Autocomplete2Component implements OnInit, OnChanges, AfterViewInit {

  @Input() data: SelectList[] = [];
  @Input() selectedId!: string;
  @Input() placeHolder!:string;
  @Input() isDisabled : boolean = false
  placeholder!: String;
  selectedValue: any
  private initialized: boolean = false;

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
    // Try to initialize, but data might not be available yet
    this.initializeSelectedItem();
  }

  ngAfterViewInit() {
    // Try again after view is initialized
    setTimeout(() => {
      this.initializeSelectedItem();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Re-initialize when data or selectedId changes
    if (changes['data'] || changes['selectedId']) {
      // Reset initialized flag when data or selectedId changes
      if (changes['data'] && !changes['data'].firstChange) {
        this.initialized = false;
      }
      if (changes['selectedId'] && !changes['selectedId'].firstChange) {
        this.initialized = false;
      }
      // Use setTimeout to ensure change detection has completed
      setTimeout(() => {
        this.initializeSelectedItem();
      }, 0);
    }
  }

  private initializeSelectedItem() {
    // Only initialize if we have data and selectedId, and haven't already initialized
    if (this.data && this.data.length > 0 && this.selectedId && !this.initialized) {
      // Use case-insensitive comparison for GUIDs
      const key = this.data.filter(t => 
        t.id && this.selectedId && 
        t.id.toLowerCase() === this.selectedId.toLowerCase()
      );
   
      if (key.length > 0 && key[0] != null) {   
        this.placeHolder = key[0].name;
        this.selectEvent(key[0]);
        this.initialized = true;
      }  
    }
  }
}