import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BilanDetailsComponent } from './bilan/bilan-details/bilan-details.component';
import { BilanOcrUploadComponent } from './bilan/bilan-ocr-upload/bilan-ocr-upload.component';
import { ListBilansComponent } from './bilan/list-bilans/list-bilans.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'bilan/list', pathMatch: 'full' },
  {
    path: 'bilan',
    canActivate: [AuthGuardService],
    children: [
      { path: 'ocr', component: BilanOcrUploadComponent },
      { path: 'list', component: ListBilansComponent },
      { path: 'details/:matricule', component: BilanDetailsComponent },
    ],
  },
  { path: 'auth', children: [{ path: 'login', component: LoginComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
