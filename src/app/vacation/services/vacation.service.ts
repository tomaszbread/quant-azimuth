import { EmployeeDto } from './../../employees/models/employee-dto';
import { TotalDuration, VacationDto, VacationType } from './../models/vacations-dto';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { multicast, refCount, share, tap } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  public leaveAnualsDays: number;
  public defaultTotal = { days: 0, hours: 0 };
  private url = 'http://localhost:3000/vacations';
  constructor(private http: HttpClient, private auth: AuthService) { }

  calculateDuration(startDate, endDate) {
    var total: TotalDuration;
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const start = startDate;
    const end = endDate;
    const differenceMs = Math.abs(start - end);
    const vacationDays = Math.round(differenceMs / day) + 1;
    total = {
      days: vacationDays,
      hours: vacationDays * 24
    };
    return total;
  }

  addVacation(vacation: VacationDto) {
    return this.http.post<VacationDto>(`${this.url}`, vacation);
  }
  getVacationsList(employeeId: number) {
    return this.http.get<VacationDto>(`${this.url}?employeeId=${employeeId}`).pipe(share());
  }
  deleteVacations(vacationId: number) {
    return this.http.delete<VacationDto>(`${this.url}/${vacationId}`);
  }

  getLeaveAnnuals(employeeId: number) {
    const url = `http://localhost:3000/leaveAnnualVacationDays?employeeId=${employeeId}`;
    return this.http.get<number>(url);
  }


}
