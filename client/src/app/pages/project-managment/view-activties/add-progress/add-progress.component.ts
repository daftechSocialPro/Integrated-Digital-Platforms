import { Component,Input,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';

import { ActivityView, AddProgressActivityDto } from '../activityview';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-progress',
  templateUrl: './add-progress.component.html',
  styleUrls: ['./add-progress.component.css']
})
export class AddProgressComponent implements OnInit {

  @Input() activity !: ActivityView ;
  @Input () ProgressStatus! : string;
  progressForm !: FormGroup;
  progress !: AddProgressActivityDto;
  user!: UserView;
  position: any;
  Documents:any;
  FinanceDoc:any; 



  months: string[] = [
    'July (ሃምሌ)',
    'August (ነሃሴ)',
    'September (መስከረም)',
    'October (ጥቅምት)',
    'November (ህዳር)',
    'December (ታህሳስ)',
    'January (ጥር)',
    'February (የካቲት)',
    'March (መጋቢት)',
    'April (ሚያዚያ)',
    'May (ግንቦት)',
    'June (ሰኔ)'
  ];

  constructor (
    private activeModal:NgbActiveModal,   
    private commonService : CommonService,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private messageService: MessageService,
    private pmService : PMService){
      
      this.progressForm = this.formBuilder.group({    
        QuarterId:['',Validators.required],      
        ActualBudget:[0,Validators.required],
        ActualWorked:[0,Validators.required],
        Remark : ['']           

      })
    }

   

  ngOnInit():  void {    
    this.getLocation()
    this.user = this.userService.getCurrentUser();
  }

  getLocation= async ()=>{
     this.position = await this.commonService.getCurrentLocation();

  }

  submit(){



    if (this.progressForm.valid && this.Documents){
      var progressValue = this.progressForm.value;
      const formData = new FormData();

      for(let file of this.Documents){
        formData.append('files',file);        
      }
      formData.append('Finance', this.FinanceDoc) ;
      formData.set('QuarterId', progressValue.QuarterId);
      formData.set('ActualBudget', progressValue.ActualBudget);
      formData.set('ActualWorked', progressValue.ActualWorked);
      formData.set('Remark', progressValue.Remark);
      formData.set('ActivityId', this.activity.id);
      formData.set('ProgressStatus',this.ProgressStatus);
      formData.set('CreatedBy', this.user.userId);
      formData.set('EmployeeValueId', this.user.employeeId);
      formData.set('lat',this.position.lat)
      formData.set('lng',this.position.lng)

   

      this.pmService.addActivityPorgress(formData).subscribe({
        next:(res)=>{

          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: 'Progress Successfully Created' });        

          this.closeModal()

        },error:(err)=>{
          
          this.messageService.add({ severity: 'error', summary: 'Network Error.', detail: 'Something went wrong' });        

          console.error(err)
        
        }
      })
      console.log(formData)
    }

  }

  onFileSelected(event:any){
   this.Documents = (event.target).files;
   
  }
  onFinanceFileSelected(event:any){
    this.FinanceDoc = (event.target).files[0];
    
  }




  closeModal(){
    this.activeModal.close()
  }



}
