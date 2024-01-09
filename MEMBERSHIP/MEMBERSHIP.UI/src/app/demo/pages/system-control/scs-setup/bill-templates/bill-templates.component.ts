import { Component, OnInit } from '@angular/core';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';

@Component({
  selector: 'app-bill-templates',
  templateUrl: './bill-templates.component.html',
  styleUrls: ['./bill-templates.component.scss']
})
export class BillTemplatesComponent implements OnInit {

  imageFile: string
  ngOnInit(): void {

    this.getBillTemplates('Template01.png')
  }
  constructor(private controlService: ScsSetupService) { }

  designs: any[] = [

    { value: "Template02.png", name: "Landscape Summary / Detail" },
    { value: "Template03.png", name: "Portrait Detail 3 per Page" },
    { value: "Template04.png", name: "Portrait Summary 3 per Page" },
    { value: "Template04.png", name: "Portrait Summary 4 per Page" },
    { value: "Template04.png", name: "Portrait A5" },
    { value: "Template08.png", name: "Thermal Paper Rolls" }
  ]

  getBillTemplates(imageName: string) {

    this.controlService.getBillTemplates(imageName).subscribe({
      next: (res) => {
        this.imageFile = 'data:image/png;base64,' + res.fileContents;

      }
    })
  }



}
