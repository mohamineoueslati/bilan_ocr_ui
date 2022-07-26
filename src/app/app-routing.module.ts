import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BilanOcrUploadComponent } from './bilan/bilan-ocr-upload/bilan-ocr-upload.component';
import { ListBilansComponent } from './bilan/list-bilans/list-bilans.component';

const routes: Routes = [
  { path: "", redirectTo: "bilan_ocr", pathMatch: "full" },
  { path: "bilan_ocr", component: BilanOcrUploadComponent },
  { path: "list_bilans", component: ListBilansComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
