import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard'

const redirectUnauthorizedHome = () => redirectUnauthorizedTo('/')
const routes: Routes = [
  {
    path:'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedHome
    },
    canActivate: [AngularFireAuthGuard]
  },
    {
      path:'upload',
      component: UploadComponent,
      data: {
        authOnly: true
      }
    },
    {
      path: 'manage-clips',
      redirectTo: 'manage'
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
