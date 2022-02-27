
import { SharedModule } from './../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddVacationComponent } from './components/add-vacation/add-vacation.component';
import { VacationsListComponent } from './components/vacations-list/vacations-list.component';



@NgModule({
  declarations: [AddVacationComponent, VacationsListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    AddVacationComponent
  ]
})
export class VacationModule { }
