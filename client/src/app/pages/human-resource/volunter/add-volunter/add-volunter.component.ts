import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { VolunterPostDto } from 'src/app/model/HRM/IEmployeeDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-volunter',
  templateUrl: './add-volunter.component.html',
  styleUrls: ['./add-volunter.component.css']
})
export class AddVolunterComponent implements OnInit {

  imagePath: any=null;
  volunterForm !: FormGroup;
  user !: UserView;
  departments!: SelectList[];
  positions!: SelectList[];
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
    private dropService: DropDownService) {

    this.volunterForm = this.formBuilder.group({

      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null, Validators.required],
      birthDate: [null, Validators.required],
      maritalStatus: [null, Validators.required],
    paymentType: [null, Validators.required],
      employmentDate: [null, Validators.required],
    
      ContractEndDate: [''],
      salary:['',Validators.required],
      sourceOfSalary: ['',Validators.required],
 
      bankAccountNo: [''],
      amharicName:[null,Validators.required],
      woreda: [null, Validators.required],
      zoneId: [null, Validators.required]


    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getDepartments();
    this.getPositions();
    this.getCountries();
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
    })
  }

  getZones (regionId:string){
    this.dropService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res
      }
    })
  }


  getDepartments() {
    this.dropService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res

      }
    })
  }



  getPositions() {
    this.dropService.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    })
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

    
    if (this.imagePath === null) {
     
      this.messageService.add({ severity: 'error', summary: 'Upload Error .', detail:'Image File not Selected' });         
      return;
    }

    
    if (this.volunterForm.valid) {


      var volunterPost: VolunterPostDto = {

        firstName: this.volunterForm.value.firstName,
        middleName: this.volunterForm.value.middleName,
        lastName: this.volunterForm.value.lastName,
        amharicName:this.volunterForm.value.amharicName,
        phoneNumber: this.volunterForm.value.phoneNumber,
        email: this.volunterForm.value.email,
        zoneId: this.volunterForm.value.zoneId,
        woreda: this.volunterForm.value.woreda,
        gender: this.volunterForm.value.gender,
        birthDate: this.volunterForm.value.birthDate,
        maritalStatus: this.volunterForm.value.maritalStatus,
        sourceOfSalary: this.volunterForm.value.sourceOfSalary,
        paymentType:this.volunterForm.value.paymentType,

        salary: this.volunterForm.value.salary,
        employmentDate: this.volunterForm.value.employmentDate,
        ContractEndDate: this.volunterForm.value.ContractEndDate,      
       
        bankAccountNo: this.volunterForm.value.bankAccountNo.toString(),      
      
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
  

      this.hrmService.addVolunter(formData).subscribe(
        {
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
        }
      )
    }

  }
  closeModal() {
    this.activeModal.close()
  }

}