import { EmployeesModule } from './employees/employees.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { VacationModule } from './vacation/vacation.module';
import { ChartsModule } from './charts/charts.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EmployeesModule,
    VacationModule,
    ChartsModule,
    AuthModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
