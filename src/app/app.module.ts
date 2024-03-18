import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { OrderComponent } from './order/order.component';
import { StockComponent } from './stock/stock.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';







@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxExtendedPdfViewerModule
   
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,

  

    //StockComponent,
    //OrderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
