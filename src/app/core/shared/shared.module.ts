import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MaxRangeDirective } from '../directives/max-range.directive';
import { SpecificDaysDirective } from '../directives/specific-days.directive';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [MaxRangeDirective, SpecificDaysDirective],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule

  ],
  providers: [DataService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MaxRangeDirective,
    SpecificDaysDirective,
    MatSidenavModule
  ]
})
export class SharedModule { }
