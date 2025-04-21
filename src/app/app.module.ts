import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {getRussianPaginatorIntl} from "./paginator-ru";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
