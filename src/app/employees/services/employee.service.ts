import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { VacationDto } from '../../vacation/models/vacations-dto';
import { VacationService } from '../../vacation/services/vacation.service';
import { EmployeeDto } from '../models/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private auth: AuthService, private vacationService: VacationService
  ) { }

  private url = 'http://localhost:3000/employees';

  addEmployee(employee: EmployeeDto) {
    return this.http.post<EmployeeDto>(this.url, employee);
  }

  updateEmployee(employee: EmployeeDto) {
    return this.http.put<EmployeeDto>(`${this.url}/${employee.id}`, employee);
  }
  deleteEmployee(id) {
    return this.http.delete<EmployeeDto>(`${this.url}/${id}`);
  }

  getEmployeeList() {
    return this.http.get<EmployeeDto[]>(`${this.url}`).pipe(share());
  }
}
