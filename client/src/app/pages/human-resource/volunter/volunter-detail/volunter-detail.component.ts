import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VolunterGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateVolunterComponent } from '../update-volunter/update-volunter.component';

@Component({
  selector: 'app-volunter-detail',
  templateUrl: './volunter-detail.component.html',
  styleUrls: ['./volunter-detail.component.css']
})
export class VolunterDetailComponent implements OnInit {

  volunterId!: string;
  volunter!: VolunterGetDto
  ngOnInit(): void {
    this.volunterId = this.router.snapshot.paramMap.get('volunterId')!
    this.getvolunter()
  }

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private hrmService: HrmService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private userService: UserService,
    private commonService: CommonService) { }

  getvolunter() {

    this.hrmService.getVolunter(this.volunterId).subscribe({
      next: (res) => {
        this.volunter = res
      
      }
    })
  }
  getImagePath(url: string) {

    return this.commonService.createImgPath(url)
  }

  callcuclateAge(date: Date) {

    return this.commonService.calculateAge(date)
  }
  volunterList() {
    this.route.navigate(["HRM/volunters"])
  }



  updatevolunter(selectedvolunter: VolunterGetDto) {
    let modalRef = this.modalService.open(UpdateVolunterComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.selectedvolunter = selectedvolunter

    modalRef.result.then (()=>{

      this.getvolunter()
    })
  }
  }
