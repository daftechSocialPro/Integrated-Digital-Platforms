import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { VolunterGetDto, VolunterPostDto } from 'src/app/model/HRM/IEmployeeDto';

import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-volunter',
  templateUrl: './update-volunter.component.html',
  styleUrls: ['./update-volunter.component.css']
})
export class UpdateVolunterComponent implements OnInit {

  @Input() selectedvolunter !:VolunterGetDto


  imagePath: any=null;
  volunterForm !: FormGroup;
  user !: UserView;
 
  countries !: SelectList[];
  regions!: SelectList[];
  zones ! : SelectList[];

  fileGH! : File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private messageService : MessageService,
    private hrmService: HrmService,
    private configurationService: ConfigurationService,
    private commonService : CommonService,
    private dropService: DropDownService) {

   
  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();

    this.getCountries();
    this.volunterForm = this.formBuilder.group({

      firstName: [this.selectedvolunter.firstName, Validators.required],
      middleName: [this.selectedvolunter.middleName, Validators.required],
      lastName: [this.selectedvolunter.lastName, Validators.required],
      email: [this.selectedvolunter.email, Validators.required],
      phoneNumber: [this.selectedvolunter.phoneNumber, Validators.required],
      gender: [this.selectedvolunter.gender, Validators.required],
      birthDate: [this.selectedvolunter.birthDate.toString().split(' ')[0], Validators.required],
      maritalStatus: [this.selectedvolunter.maritalStatus, Validators.required],

      paymentType: [this.selectedvolunter.paymentType, Validators.required],
      employmentDate: [this.selectedvolunter.employmentDate.toString().split('T')[0], Validators.required],
     
      ContractEndDate: [this.selectedvolunter.contractEndDate!.toString().split('T')[0]],
     
      salary: [this.selectedvolunter.salary],
      sourceOfSalary: [this.selectedvolunter.sourceOfSalary],
      bankAccountNo: [this.selectedvolunter.bankAccountNo],
      woreda: [this.selectedvolunter.woreda, Validators.required],
      countryId : [this.selectedvolunter.countryId],
      amharicName:[this.selectedvolunter.amharicName],      
      regionId : [this.selectedvolunter.regionId],
      zoneId: [this.selectedvolunter.zoneId, Validators.required]


    })
    this.getRegions(this.selectedvolunter.countryId)
    this.getZones(this.selectedvolunter.regionId)
  }


  getCountries() {

    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res
      }
    })
  }

  getRegions(countryId: string) {

    this.dropService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.regions = res
      }
    });
  }

  getZones (regionId:string){
    this.dropService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res
      }
    });
  }


 

  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.imagePath = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  submit() {
    
    if (this.volunterForm.valid) {
      var volunterPost: VolunterPostDto = {

        id: this.selectedvolunter.id,
        firstName: this.volunterForm.value.firstName,
        middleName: this.volunterForm.value.middleName,
        lastName: this.volunterForm.value.lastName,
        amharicName : this.volunterForm.value.amharicName,
        phoneNumber: this.volunterForm.value.phoneNumber,
        email: this.volunterForm.value.email,
        gender: this.volunterForm.value.gender,
        birthDate: this.volunterForm.value.birthDate,
        maritalStatus: this.volunterForm.value.maritalStatus,
     
       sourceOfSalary:this.volunterForm.value.sourceOfSalary,
        paymentType: this.volunterForm.value.paymentType,
        employmentDate: this.volunterForm.value.employmentDate,
        ContractEndDate: this.volunterForm.value.ContractEndDate,
        bankAccountNo: this.volunterForm.value.bankAccountNo.toString(),
              
        zoneId: this.volunterForm.value.zoneId,
        woreda: this.volunterForm.value.woreda,
       
        createdById: this.user.userId,

      }

      var formData = new FormData();
      for (let key in volunterPost) {
        if (volunterPost.hasOwnProperty(key)) {
          formData.append(key, (volunterPost as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('imagePath', this.fileGH);  

      this.hrmService.updateVolunter(formData).subscribe({
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
           
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
            
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        })
    }

  }
  closeModal() {
    this.activeModal.close()
  }

  getImage (url:string){

    return this.commonService.createImgPath(url)
  }
  getImage2() {

    if (this.imagePath != null) {
      return this.imagePath
    }
    if (this.selectedvolunter != null) {
      return this.getImage(this.selectedvolunter.imagePath!)
    }
    else {
      return 'assets/img/company.jpg'
    }
  }

}
