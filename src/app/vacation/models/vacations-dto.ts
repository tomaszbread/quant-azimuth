export class VacationDto {
    public id: number;
    public employeeId: number;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public requestingDate: Date;
    public vacationChooseTime: Date;
    public totalDuration: TotalDuration;
    public vacationType: VacationType;
}

export interface TotalDuration {
    hours: number,
    days: number,
}

export enum VacationType {
    Annual = 30,
    Sick = 15,
    Unpaid,
    Paternal = 5,
    Maternity = 45,
}