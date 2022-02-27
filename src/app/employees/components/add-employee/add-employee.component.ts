import { EmployeeDto } from '../../models/employee-dto';
import { MartialStatus, Role, Status } from '../../models/employee-dto';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../models/employee-dto';
import { EmployeeService } from '../../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})

export class AddEmployeeComponent implements OnInit {

  public addEmployeeForm: FormGroup;
  public gender = Gender;
  public role = Role;
  public status = Status;
  public martialStatus = MartialStatus;
  public martialStatusList: Array<any>;
  public roleList: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public employeeDto: EmployeeDto
  ) {
  }


  ngOnInit(): void {
    this.createForm();
    this.setEmployeeData();
    this.setSelectOptions();
  }

  setEmployeeData() {
    this.addEmployeeForm.patchValue(this.employeeDto);
  }

  setSelectOptions() {
    this.martialStatusList = this.dataService.keys(this.martialStatus);
    this.roleList = this.dataService.keys(this.role);
  }

  createForm() {
    this.addEmployeeForm = this.formBuilder.group({
      id: [''],
      employeeCode: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      dateOfEmployment: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      martialStatus: [null, [Validators.required]],
      role: [null, [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }


  addEmployee() {
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(res => this.dialogRef.close(res));
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.addEmployeeForm.value).subscribe(res => this.dialogRef.close(res));
  }

  generateAlphanumericCode() {
    this.addEmployeeForm.controls.employeeCode.setValue(Math.random().toString(36).slice(2));
  }

}

