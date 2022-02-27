import { Component, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()
export class DaysRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    public days: number;
    constructor(private _dateAdapter: DateAdapter<D>) { }

    selectionFinished(date: D | null): DateRange<D> {
        return this._createDaysRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createDaysRange(activeDate);
    }

    private _createDaysRange(date: D | null): DateRange<D> {
        if (date) {
            const endDaysOffset = Math.floor(this.days - 1);
            const start = date;
            const end = this._dateAdapter.addCalendarDays(date, endDaysOffset);
            return new DateRange<D>(start, end);
        }
        return new DateRange<D>(null, null);
    }
}