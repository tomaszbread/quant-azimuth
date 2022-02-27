import { VacationDto } from './../../models/vacations-dto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { EmployeeService } from '../../../employees/services/employee.service';
import { VacationType } from '../../models/vacations-dto';
import { VacationService } from '../../services/vacation.service';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.scss']
})
export class VacationsListComponent implements OnInit {

  @Input() vacationsList: any;
  @Input() vacationsList$: any;
  @Output() remainingAnnualVacationDaysChange: EventEmitter<any> = new EventEmitter();
  public vacationType = VacationType;

  constructor(
    public dialog: MatDialog,
    public vacationService: VacationService,

  ) { }


  ngOnInit(): void {

  }

  deleteVacation(vacationId: number) {
    this.vacationService.deleteVacations(vacationId).subscribe(res => {
      this.vacationsList$.next(true);
      this.remainingAnnualVacationDaysChange.emit();
    });
  }







}
