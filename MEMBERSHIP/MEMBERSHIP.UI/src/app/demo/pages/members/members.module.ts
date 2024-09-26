import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';

import { ReactiveFormsModule } from '@angular/forms';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { PaginatorModule } from 'primeng/paginator';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberCourseComponent } from './member-course/member-course.component';
import { MemberAnnouncmentsComponent } from './member-announcments/member-announcments.component';
import { GenerateIdCardComponent } from './generate-id-card/generate-id-card.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RequestedIdcardsComponent } from './requested-idcards/requested-idcards.component';
import { ChangeIdStatusComponent } from './change-id-status/change-id-status.component';
import { RenewMemberComponent } from './renew-member/renew-member.component';
import { MembersDashboardComponent } from './members-dashboard/members-dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PendingMembersComponent } from './pending-members/pending-members.component';
import { CelebrationComponent } from './celebration/celebration.component';
import { RegisterMembersAdminComponent } from './register-members-admin/register-members-admin.component';

@NgModule({
  declarations: [MembersComponent, MemberProfileComponent, MemberCourseComponent, MemberAnnouncmentsComponent, GenerateIdCardComponent, RequestedIdcardsComponent, ChangeIdStatusComponent, RenewMemberComponent,MembersDashboardComponent, MemberDetailComponent, PendingMembersComponent,CelebrationComponent, RegisterMembersAdminComponent],
  imports: [CommonModule, MembersRoutingModule, InputMaskModule, ReactiveFormsModule, PaginatorModule, QRCodeModule]
})
export class MembersModule {}
