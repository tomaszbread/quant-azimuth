import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../../core/services/data.service';
import { AddVacationComponent } from '../../../vacation/components/add-vacation/add-vacation.component';
import { EmployeeData, EmployeeDto, Gender, MartialStatus, Role, Status } from '../../models/employee-dto';
import { EmployeeService } from '../../services/employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: any;
  public gender = Gender;
  public role = Role;
  public status = Status;
  public martialStatus = MartialStatus;
  public employeList$ = new BehaviorSubject<boolean>(true);
  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeeService,
    private dataService: DataService,) { }


  ngOnInit(): void {
    this.employeeList = this.employeList$.pipe(switchMap(res => this.employeeService.getEmployeeList()));
  }

  addEmployee() {
    this.openEmployeeModal();
  }

  editEmployee(employee: EmployeeDto) {
    this.openEmployeeModal(employee);
  }

  openEmployeeModal(employee?: EmployeeDto) {
    let params: EmployeeData = this.dataService.getDefaultModalParams();
    Object.assign(params, { data: employee });
    let dialogRef = this.dialog.open(AddEmployeeComponent, params);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.employeList$.next(true);
      }
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(res => this.employeList$.next(true));
  }

  addVacation(employee: EmployeeDto) {
    let params = this.dataService.getDefaultModalParams();
    Object.assign(params, { data: employee });
    let dialogRef = this.dialog.open(AddVacationComponent, params);
    dialogRef.afterClosed().subscribe(res => {
      this.employeList$.next(true);
    });
  }

}
