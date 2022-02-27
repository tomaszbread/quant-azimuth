import { EmployeeService } from './services/employee.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SharedModule } from '../core/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  providers: [
    EmployeeService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    EmployeeListComponent,
    AddEmployeeComponent
  ]
})
export class EmployeesModule { }
