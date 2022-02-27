import { SharedModule } from './../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './components/charts/charts.component';



@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ChartsComponent
  ]
})
export class ChartsModule { }
