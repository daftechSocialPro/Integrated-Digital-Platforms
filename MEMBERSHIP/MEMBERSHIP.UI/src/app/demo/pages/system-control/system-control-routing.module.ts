import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ScsDataComponent from './scs-data/scs-data.component';
import { ScsMaintainComponent } from './scs-maintain/scs-maintain.component';
import { ScsSettingsComponent } from './scs-settings/scs-settings.component';
import { ScsSetupComponent } from './scs-setup/scs-setup.component';
import { ScsHomeComponent } from './scs-home/scs-home.component';
import DefaultComponent from '../../default/default.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'home',
        component:DefaultComponent
      },
      {
        path: 'data',
        component:ScsDataComponent
      },
      {
        path: 'setting',
        component:ScsSettingsComponent
      },
      {
        path: 'maintain',
        component:ScsMaintainComponent
      },
      {
        path: 'setup',
        component:ScsSetupComponent

      },
      
      
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemControlRoutingModule { }
