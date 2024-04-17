import { Component, OnInit } from '@angular/core';
import { TagNumberListDto } from 'src/app/model/Inventory/ITagNumberListDto';
import { CommonService } from 'src/app/services/common.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-tag-number',
  templateUrl: './tag-number.component.html',
  styleUrls: ['./tag-number.component.css'],
})
export class TagNumberComponent implements OnInit {
  constructor(private inventoryService: InventoryService,private commonService:CommonService) {}

  tagNumberLists: TagNumberListDto[] = [];

  ngOnInit(): void {
    this.getTagNumberList();
  }

  getTagNumberList() {
    this.inventoryService.getTagNumberLists();
  }

  getImageByPath(url:string){

    return this.commonService.createImgPath(url)

  }
}
