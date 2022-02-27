import { Directive, Inject, Input } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { DaysRangeSelectionStrategy } from './day-range-selection-strategy';

@Directive({
  selector: '[specificDays]',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DaysRangeSelectionStrategy
    }
  ]
})
export class SpecificDaysDirective {


  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private specifyDaysStrategy: DaysRangeSelectionStrategy<any>
  ) { }

  @Input() set specificDays(value: number) {
    this.specifyDaysStrategy.days = value;
  }

}
