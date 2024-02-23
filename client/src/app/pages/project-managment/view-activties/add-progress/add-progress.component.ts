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
import { ViewProgressDto } from 'src/app/model/PM/ActivityViewDto';

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
  Documents:File[]=[];
  FinanceDoc:any; 
  draftedProgress!:ViewProgressDto
  filteredPerformanceArray!:any[]
  




  months: string[] = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'September',
    'October',
    'November',
    'December'
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
    this.getPerformancesByCurrentYear()
    this.getLocation()
    this.user = this.userService.getCurrentUser();
    this.getDraftedProgress()

  

    console.log('month performance',this.activity.monthPerformance)
  }

  getDraftedProgress(){

    this.pmService.viewDraftProgress(this.activity.id).subscribe({
      next:(res)=>{
        this.draftedProgress =res
        

        if(this.draftedProgress){
          this.progressForm.controls['ActualBudget'].setValue(this.draftedProgress.usedBudget)
          this.progressForm.controls['QuarterId'].setValue(this.draftedProgress.quarterId)
          this.progressForm.controls['ActualWorked'].setValue(this.draftedProgress.actalWorked)
          this.progressForm.controls['Remark'].setValue(this.draftedProgress.remark)
        }
      }
    })

  }
  getLocation= async ()=>{
     this.position = await this.commonService.getCurrentLocation();

  }

  

  submit(bool:boolean){


    if (this.progressForm.valid ){
      var progressValue = this.progressForm.value;
      const formData = new FormData();

      for(let file of this.Documents){
        formData.append('DcoumentPath',file);        
      }
      formData.append('FinacncePath', this.FinanceDoc) ;
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
      formData.set('IsDraft',bool.toString())

      if(this.draftedProgress){
        formData.set('Id',this.draftedProgress.id)
        this.pmService.updateActivityProgress(formData).subscribe({
          next:(res)=>{
  
            if(res.success){
  
              this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });       
    
              this.closeModal()
              window.location.reload()   
            
            }
              else {
                this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: res.message });       
    
              }
    
  
          },error:(err)=>{
            
            this.messageService.add({ severity: 'error', summary: 'Network Error.', detail: 'Something went wrong' });        
  
            console.error(err)
          
          }
        })
      }
      else {
        this.pmService.addActivityPorgress(formData).subscribe({
          next:(res)=>{

            if(res.success){
  
            this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });       
  
            this.closeModal()
            window.location.reload()
          }
            else {
              this.messageService.add({ severity: 'error', summary: 'Verfication Failed.', detail: res.message });       
  
            }
  
          },error:(err)=>{
            
            this.messageService.add({ severity: 'error', summary: 'Network Error.', detail: 'Something went wrong' });        
  
            console.error(err)
          
          }
        })
      }


      
   

     
     
    }

  }


  updateProgress(){
    
  }








  getFilePath (value:string){

    return this.commonService.createImgPath(value)

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

  getStartMonth(){
    const currentYear = new Date().getFullYear();
    const startYear = (new Date(this.activity.startDate)).getFullYear()
    if(currentYear == startYear){
      return (new Date (this.activity.startDate)).getMonth()
    }
    else{
      return 0

    }
    
  }
  getPerformancesByCurrentYear() {
    const currentYear = new Date().getFullYear();
    const startIndex = this.getStartMonth(); 
    const filteredArray = this.activity.monthPerformance.filter(item => {
      const itemYear = item.year
      return itemYear === currentYear;
    });
    console.log("filteredArray.slice(startIndex)", this.activity.monthPerformance)
    this.filteredPerformanceArray = filteredArray.slice(startIndex)
   // return filteredArray.slice(startIndex);
  }


}
