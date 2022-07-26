import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { BilanOcrUploadComponent } from './bilan/bilan-ocr-upload/bilan-ocr-upload.component';
import { ListBilansComponent } from './bilan/list-bilans/list-bilans.component';
import { LoginComponent } from './auth/login/login.component';
import { BilanDetailsComponent } from './bilan/bilan-details/bilan-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BilanOcrUploadComponent,
    ListBilansComponent,
    LoginComponent,
    BilanDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
