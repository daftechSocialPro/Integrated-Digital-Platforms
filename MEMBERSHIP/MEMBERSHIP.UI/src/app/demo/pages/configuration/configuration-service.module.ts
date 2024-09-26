import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginatorModule } from 'primeng/paginator';
import { ConfigurationServiceRoutingModule } from './configuration-routing.module';
import { EducationSettingComponent } from './education-setting/education-setting.component';
import { LocationSettingComponent } from './location-setting/location-setting.component';
import { MembershipTypesComponent } from './membership-types/membership-types.component';
import { CountryComponent } from './location-setting/country/country.component';
import { RegionComponent } from './location-setting/region/region.component';
import { ZoneComponent } from './location-setting/zone/zone.component';
import { AddCountryComponent } from './location-setting/country/add-country/add-country.component';
import { AddRegionComponent } from './location-setting/region/add-region/add-region.component';
import { AddZoneComponent } from './location-setting/zone/add-zone/add-zone.component';
import { EducationalFieldComponent } from './education-setting/educational-field/educational-field.component';
import { EducationalLevelComponent } from './education-setting/educational-level/educational-level.component';
import { AddEducationalFieldComponent } from './education-setting/educational-field/add-educational-field/add-educational-field.component';
import { AddEducationalLevelComponent } from './education-setting/educational-level/add-educational-level/add-educational-level.component';
import { AddMembershipTypeComponent } from './membership-types/add-membership-type/add-membership-type.component';
import { CourseComponent } from './course/course.component';
import { AnnouncmentComponent } from './announcment/announcment.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { AddAnnouncmentComponent } from './announcment/add-announcment/add-announcment.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [  
    EducationSettingComponent,
    LocationSettingComponent,
    MembershipTypesComponent,
    CountryComponent,
    RegionComponent,
    ZoneComponent,
    AddCountryComponent,
    AddRegionComponent,
    AddZoneComponent,
    EducationalFieldComponent,
    EducationalLevelComponent,
    AddEducationalFieldComponent,
    AddEducationalLevelComponent,
    AddMembershipTypeComponent,
    CourseComponent,
    AnnouncmentComponent,
    AddCourseComponent,
    AddAnnouncmentComponent,
    EventDescriptionComponent,
      
 ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigurationServiceRoutingModule,
    PaginatorModule,
    ReactiveFormsModule,
    EditorModule

  ]
})
export class ConfigurationServiceModule { }
