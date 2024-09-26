import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { TaskView } from 'src/app/model/PM/TaskDto';
import {
  SubActivityDetailDto,
  ActivityDetailDto,
  ActivityLocationDto,
} from 'src/app/model/PM/add-activities';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { toastPayload } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { AddProjectLocationComponent } from '../../pm-configuration/project-location/add-project-location/add-project-location.component';

@Component({
  selector: 'app-update-activities',
  templateUrl: './update-activities.component.html',
  styleUrls: ['./update-activities.component.css'],
})
export class UpdateActivitiesComponent implements OnInit {
  @Input() task!: TaskView;
  @Input() requestFrom!: string;
  @Input() requestFromId!: string;
  @Input() dateAndTime!: GetStartEndDate;
  @Input() activity!: any;
  @Input() planId!: string;

  countries: SelectList[] = [];
  regions: SelectList[] = [];
  zones: SelectList[] = [];

  activityForm!: FormGroup;
  selectedEmployee: SelectList[] = [];
  user!: UserView;
  committees: SelectList[] = [];
  unitMeasurments: SelectList[] = [];
  toast!: toastPayload;
  comitteEmployees: SelectList[] = [];

  strategicPlans: SelectList[] = [];
  strategicPlanIndicators: SelectList[] = [];
  projectLocations: SelectList[] = [];
  Employees: SelectList[] = [];
  minDate!: Date;

  maxDate!: Date;

  lat = 0;
  lng = 0;

  projectFundSources: SelectList[];

  commiteeId: string = null;
  employeeId: string[];

  activityLocations: ActivityLocationDto[];

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private dropDownService: DropDownService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private dropService: DropDownService,
    private commonService: CommonService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.getCountries();
    this.GetIndicatorsByStrategicPlanIds(this.activity.strategicPlan);

    if (
      this.activity.activityLocations.length > 0 &&
      this.activity.activityLocations[0].region
    ) {
      this.getRegions(this.activity.activityLocations[0].region.countryId);
    }

    this.user = this.userService.getCurrentUser();
    this.getProjectFundSourse();

    this.ListofEmployees();
    this.GetStrategicPlans();
    this.pmService.getComitteeSelectList().subscribe({
      next: (res) => {
        this.committees = res;
      },
      error: (err) => {},
    });

    this.dropDownService.GetUnitOfMeasurment().subscribe({
      next: (res) => {
        this.unitMeasurments = res;
      },
      error: (err) => {},
    });
    this.checkAssignType();

    this.minDate = new Date();
    this.maxDate = new Date(this.dateAndTime.endDate);

    this.minDate.setDate(1);
    this.minDate.setMonth(1);
    this.minDate.setFullYear(Number(this.dateAndTime.fromDate));

    this.activityForm = this.formBuilder.group({
      StartDate: [this.activity.startDate.split(' ')[0], Validators.required],
      EndDate: [this.activity.endDate.split(' ')[0], Validators.required],
      ActivityDescription: [this.activity.name, Validators.required],
      ActivityNumber: [this.activity.activityNumber, Validators.required],
      PlannedBudget: [
        this.activity.plannedBudget,
        [
          Validators.required,
          Validators.max(
            this.task?.remainingBudget! + this.activity.plannedBudget
          ),
        ],
      ],
      ActivityType: [this.checkActivityType()],
      OfficeWork: [this.activity.officeWork, Validators.required],
      FieldWork: [this.activity.fieldWork, Validators.required],
      UnitOfMeasurement: [this.activity.unitOfMeasurment, Validators.required],
      PreviousPerformance: [
        this.activity.begining,
        [Validators.required, Validators.min(0)],
      ],
      Goal: [this.activity.target, [Validators.required, Validators.min(0)]],
      WhomToAssign: [this.checkAssignType()],
      // TeamId: [null],
      CommiteeId: [this.commiteeId],
      AssignedEmployee: [this.employeeId],
      StrategicPlan: [this.activity.strategicPlan],
      StrategicPlanIndicatorId: [this.activity.strategicPlanIndicator],
      IsTraining: [this.activity.isTraining, Validators.required],
      IsPercentage: [this.activity.isPercentage, Validators.required],
      CountryId: [
        this.activity.activityLocations.length > 0
          ? this.activity.activityLocations[0].region.countryId
          : '',
        Validators.required,
      ],
      // RegionId:[this.activity.regionId,Validators.required],
      // Zone:[this.activity.zone],
      // Woreda:[this.activity.woreda],
      SelectedProjectFund: [this.activity.projectSourceId, Validators.required],

      regionss: [
        this.activity.activityLocations
          ? this.activity.activityLocations.map((item) => item.regionId)
          : [],
      ],
      locations: this.formBuilder.array([]),
      IsCancelled: [this.activity.isCancelled, Validators.required],
    });

    this.updateLocationForm();
  }

  updateLocationForm() {
    // Get the selected region IDs
    var regionName = '';
    // Check if locations is a FormArray
    if (this.locations instanceof FormArray) {
      const currentLocationForms = this.locations;

      // Add location forms for newly selected regions
      this.activity.activityLocations.forEach((item: any) => {
        var regionId = item.regionId;

        const locationFormExists = currentLocationForms.controls.some(
          (locationForm) => {
            const existingRegionId = (locationForm as FormGroup).get(
              'regionId'
            )?.value;
            return existingRegionId === regionId;
          }
        );

        regionName = item.region.regionName;

        if (!locationFormExists) {
          const locationGroup = this.formBuilder.group({
            regionName: regionName,
            regionId: regionId,
            zone: item.zone,
            woreda: item.woreda,
            latitude: item.latitude,
            longtude: item.longtude,
          });

          this.locations.push(locationGroup);
        }
      });
    }
  }

  getProjectFundSourse() {
    this.dropDownService
      .GetProjectFundSourcesForActivity(this.planId)
      .subscribe({
        next: (res) => {
          this.projectFundSources = res;
        },
      });
  }
  checkActivityType() {
    if (this.activity.activityType === 'BOTH') {
      return 0;
    }
    if (this.activity.activityType === 'OFFICE_WORK') {
      return 1;
    }
    return 2;
  }

  checkAssignType() {
    const firstMemberId = this.activity.members?.[0]?.id;
    if (this.committees.find((x) => x.id === firstMemberId)) {
      this.commiteeId = firstMemberId;
      return 0;
    }
    this.employeeId =
      this.activity.members?.map((member) => member.employeeId) || [];

    return 1;
  }
  ListofEmployees() {
    this.taskService.getEmployeeNoTaskMembers(this.task.id!).subscribe({
      next: (res) => {
        this.Employees = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getCountries() {
    this.dropService.getContriesDropdown().subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }

  getRegions(countryId: string) {
    this.dropService.getRegionsDropdown(countryId).subscribe({
      next: (res) => {
        this.regions = res;
      },
    });
  }

  getZones(regionId: string) {
    this.dropService.getZonesDropdown(regionId).subscribe({
      next: (res) => {
        this.zones = res;
      },
    });
  }

  GetStrategicPlans() {
    this.dropDownService.getStrategicPlans().subscribe({
      next: (res) => {
        this.strategicPlans = res;
      },
    });
  }

  GetIndicatorsByStrategicPlanIds(strategicPlanId: string) {
    this.dropDownService
      .getIndicatorByStrategicPlanId(strategicPlanId)
      .subscribe({
        next: (res) => {
          this.strategicPlanIndicators = res;
        },
      });
  }
  // GetProjectLocations(){
  //   this.dropDownService.getProjectLocations().subscribe({
  //     next:(res)=>{
  //       this.projectLocations = res
  //     }
  //   })
  // }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event);
    this.task.taskMembers = this.task.taskMembers!.filter(
      (x) => x.id != event.id
    );
  }

  removeSelected(emp: SelectList) {
    this.selectedEmployee = this.selectedEmployee.filter((x) => x.id != emp.id);
    this.task.taskMembers!.push(emp);
  }

  submit() {
    if (this.requestFrom == 'PLAN' || this.requestFrom == 'TASK') {
      // this.addSubActivity()
    } else {
      this.addActivityParent();
    }
  }

  addActivityParent() {
    if (
      this.activityForm.value.Goal <=
      this.activityForm.value.PreviousPerformance
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Baseline Target Error',
        detail: 'Baseline can not be Greater or equal to Target !!',
      });
      return;
    }

    if (this.activityForm.valid) {
      let actvityP: SubActivityDetailDto = {
        Id: this.activity.id,
        SubActivityDesctiption: this.activityForm.value.ActivityDescription,
        StartDate: this.activityForm.value.StartDate,
        EndDate: this.activityForm.value.EndDate,
        PlannedBudget: this.activityForm.value.PlannedBudget,
        ActivityNumber: this.activityForm.value.ActivityNumber,
        ActivityType: this.activityForm.value.ActivityType,
        OfficeWork:
          this.activityForm.value.ActivityType == 0
            ? this.activityForm.value.OfficeWork
            : this.activityForm.value.ActivityType == 1
            ? 100
            : 0,
        FieldWork:
          this.activityForm.value.ActivityType == 0
            ? this.activityForm.value.FieldWork
            : this.activityForm.value.ActivityType == 2
            ? 100
            : 0,
        UnitOfMeasurement: this.activityForm.value.UnitOfMeasurement,
        PreviousPerformance: this.activityForm.value.PreviousPerformance,
        Goal: this.activityForm.value.Goal,
        TeamId: this.activityForm.value.TeamId,
        CommiteeId: this.activityForm.value.CommiteeId,
        Employees: this.activityForm.value.AssignedEmployee,
        StrategicPlanId: this.activityForm.value.StrategicPlan,
        RegionId: this.activityForm.value.RegionId,
        Zone: this.activityForm.value.Zone,
        Woreda: this.activityForm.value.Woreda,
        StrategicPlanIndicatorId:
          this.activityForm.value.StrategicPlanIndicatorId,
        IsTraining: this.activityForm.value.IsTraining,
        IsPercentage: this.activityForm.value.IsPercentage,

        // longtude: this.lng,
        // latitude: this.lat,
        activityLocations: this.activityForm.value.locations,
        selectedProjectFund: this.activityForm.value.SelectedProjectFund,
        IsCancelled: this.activityForm.value.IsCancelled,
      };

      if (this.requestFrom == 'Plan') {
        actvityP.PlanId = this.requestFromId;
      } else if (this.requestFrom == 'Task') {
        actvityP.TaskId = this.requestFromId;
      }

      let activityList: SubActivityDetailDto[] = [];
      activityList.push(actvityP);

      let addActivityDto: ActivityDetailDto = {
        Id: this.activity.id,
        ActivityDescription: this.activityForm.value.ActivityDescription,
        HasActivity: false,
        TaskId: this.task.id!,
        CreatedBy: this.user.userId,
        ActivityDetails: activityList,
      };

      this.pmService.updateActivityParent(addActivityDto).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successfull',
              detail: res.message,
            });
            this.activityForm.reset();
            window.location.reload();
            this.closeModal();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: res.message,
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went Wrong',
            detail: err.message,
          });

          console.error(err);
        },
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  onCommiteChange(comitteId: string) {
  
    this.pmService.getComitteEmployees(comitteId).subscribe({
      next: (res) => {
        this.comitteEmployees = res;
      },
      error: (err) => {},
    });
  }

  addLocation(regionId, locationGroup) {
    event.preventDefault();
    let modalRef = this.modalService.open(AddProjectLocationComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.calledFrom = 1;
    modalRef.componentInstance.regionId = regionId;

    modalRef.result.then((res) => {
      locationGroup.patchValue({
        longtude: res.lng,
        latitude: res.lat,
      });
    });
  }

  updateLocationForms() {
    const selectedRegionIds = this.activityForm.get('regionss')?.value; // Get the selected region IDs
    var regionName = '';
    // Check if locations is a FormArray
    if (this.locations instanceof FormArray) {
      const currentLocationForms = this.locations;

      // Remove location forms that are no longer selected
      for (let i = currentLocationForms.length - 1; i >= 0; i--) {
        const locationForm = currentLocationForms.at(i) as FormGroup;
        const regionId = locationForm.get('regionId')?.value;

        if (!selectedRegionIds.includes(regionId)) {
          this.locations.removeAt(i);
        }
      }

      // Add location forms for newly selected regions
      selectedRegionIds.forEach((regionId: string) => {
        const locationFormExists = currentLocationForms.controls.some(
          (locationForm) => {
            const existingRegionId = (locationForm as FormGroup).get(
              'regionId'
            )?.value;
            return existingRegionId === regionId;
          }
        );

        regionName = this.regions.filter(
          (x) => x.id.toLowerCase() == regionId.toLowerCase()
        )[0].name;

        if (!locationFormExists) {
          const locationGroup = this.formBuilder.group({
            regionName: regionName,
            regionId: regionId,
            zone: '',
            woreda: '',
            latitude: 0,
            longtude: 0,
          });

          this.locations.push(locationGroup);
        }
      });
    }
  }

  // Getter for easier access to the locations FormArray
  get locations() {
    return this.activityForm.get('locations') as FormArray;
  }

  get regionss() {
    return this.activityForm.get('regionss');
  }
}
