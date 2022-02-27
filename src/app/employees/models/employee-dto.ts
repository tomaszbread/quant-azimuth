import { VacationDto } from './../../vacation/models/vacations-dto';
export class EmployeeDto {
    public id: number;
    public employeeCode: number;
    public firstName: string;
    public lastName: string;
    public birthDate: Date;
    public dateOfEmployment: Date;
    public gender: Gender;
    public martialStatus: MartialStatus;
    public role: string;
    public mobileNumber: number;
    public status: string;
    public remainingAnnualVacationDays: number;
    public closestVacation: Date;
}

export enum Gender {
    female = 1,
    male = 2
}

export enum Status {
    active = 1,
    inactive = 2
}

export enum MartialStatus {
    single,
    married,
    widowed,
    divorced,
    separated,
    partnership
}

export enum Role {
    programmer,
    scrumaster,
    teamleader,
    buisnesowner,
    support
}

export interface EmployeeData {
    panelClass: string,
    width: string,
    data?: EmployeeDto,
}