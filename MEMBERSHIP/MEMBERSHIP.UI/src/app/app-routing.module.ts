import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './auth/auth.guard';
import { MembersDashboardComponent } from './demo/pages/members/members-dashboard/members-dashboard.component';
import { OnConstructionComponent } from './demo/on-construction/on-construction.component';
import { BoardMemberDashbaordComponent } from './demo/board-member-dashbaord/board-member-dashbaord.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin-dashboard',
        pathMatch: 'full'
      },

      {
        path: 'admin-dashboard',
        loadComponent: () => import('./demo/admin-dashbord/dashboard-content.component').then(m => m.DashboardContentComponent)
      },
      {
        path: 'member-dashboard',
        component: MembersDashboardComponent
      },

      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },

      {
        path: 'users',
        loadComponent: () => import('./demo/pages/users/users.component')
      },

      {
        path: 'configuration',
        loadChildren: () => import('./demo/pages/configuration/configuration-service.module').then((m) => m.ConfigurationServiceModule)
      },
      {
        path: 'members',
        loadChildren: () => import('./demo/pages/members/members.module').then((m) => m.MembersModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./demo/pages/reports/reports.module').then((m) => m.ReportsModule)
      }
    ]
  },
  {
    path: 'on-construction',
    component: OnConstructionComponent
  },
  {
    path: 'board-member-dashboard',
    component: BoardMemberDashbaordComponent
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
