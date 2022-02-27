import { EmployeeDto } from './../../../employees/models/employee-dto';
import { VacationType, VacationDto } from './../../models/vacations-dto';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../core/services/data.service';
import { EmployeeService } from '../../../employees/services/employee.service';
import { VacationService } from '../../services/vacation.service';
import { VacationsListComponent } from '../vacations-list/vacations-list.component';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.scss']
})
export class AddVacationComponent implements OnInit {
  public addVacationForm: FormGroup;
  public vacationType = VacationType;
  public vacationTypeList: Array<any>;
  public currentDate = new Date();
  public maxRange: number;
  public vacationsList: any;
  public remainingAnnualVacationDays: any = 0;
  public vacationsList$ = new BehaviorSubject<boolean>(true);
  @ViewChild(VacationsListComponent) vacationsListComponent: VacationsListComponent;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddVacationComponent>,
    public vacationService: VacationService,
    public dataService: DataService,
    public employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public emp: EmployeeDto

  ) {

  }

  ngOnInit(): void {
    this.prepareData();
    this.createForm();
    this.setSelectOptions();
  }

  prepareData() {
    this.vacationsList = this.vacationsList$.pipe(
      switchMap(res => this.vacationService.getVacationsList(this.emp.id))
    );
    this.getRemainingAnnualVacationDays();
  }
  async getRemainingAnnualVacationDays() {
    this.remainingAnnualVacationDays = await this.vacationService.getLeaveAnnuals(this.emp.id).toPromise();
  }


  calculateMaxRange() {
    if (this.getVacationType() == VacationType.Annual) {
      this.maxRange = this.remainingAnnualVacationDays;
      return this.maxRange;
    }
    this.maxRange = VacationType.Sick as number;
    return this.maxRange;
  }

  createForm() {
    this.addVacationForm = this.formBuilder.group({
      id: ['',],
      employeeId: [this.emp.id],
      vacationStartDate: ['', [Validators.required]],
      vacationEndDate: ['', [Validators.required]],
      vacationChooseTime: [''],
      totalDuration: this.formBuilder.group({
        days: [0],
        hours: [0],
      }),
      requestingDate: [this.currentDate],
      vacationType: [null, [Validators.required]],
    });
  }

  setSelectOptions() {
    this.vacationTypeList = this.dataService.keys(this.vacationType);
  }

  getVacationType() {
    return this.addVacationForm.controls.vacationType.value;
  }


  changeType() {
    this.clearRange();
  }

  clearRange() {
    this.addVacationForm.patchValue({ vacationStartDate: '', vacationEndDate: '' });
    this.addVacationForm.controls.totalDuration.patchValue({ days: 0, hours: 0 });
  }

  calculateDuration() {
    const start = this.addVacationForm.controls.vacationStartDate.value;
    const end = this.addVacationForm.controls.vacationEndDate.value;
    if (end instanceof Date && start instanceof Date) {
      this.addVacationForm.controls.totalDuration.patchValue(this.vacationService.calculateDuration(start, end));
      this.addVacationForm.controls.vacationChooseTime.patchValue(new Date().toLocaleTimeString());
    }
    else {
      this.addVacationForm.controls.totalDuration.patchValue(this.vacationService.defaultTotal);
    }
  }


  addVacation() {
    if (this.addVacationForm.invalid) {
      return;
    }
    this.vacationService.addVacation(this.addVacationForm.value).subscribe(x => {
      this.addVacationForm.reset();
      this.createForm();
      this.getRemainingAnnualVacationDays();
      this.vacationsListComponent.vacationsList$.next(true);
    });

  }

}
