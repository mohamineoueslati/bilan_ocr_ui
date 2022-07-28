import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { BilanOcrUploadComponent } from './bilan/bilan-ocr-upload/bilan-ocr-upload.component';
import { ListBilansComponent } from './bilan/list-bilans/list-bilans.component';
import { LoginComponent } from './auth/login/login.component';
import { BilanDetailsComponent } from './bilan/bilan-details/bilan-details.component';
import { FormsModule } from '@angular/forms';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BilanOcrUploadComponent,
    ListBilansComponent,
    LoginComponent,
    BilanDetailsComponent,
    SortableTableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    DecimalPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
