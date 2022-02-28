import { EmployeeDto } from './../../../employees/models/employee-dto';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { map, reduce, tap } from 'rxjs/operators';
import { EmployeeService } from '../../../employees/services/employee.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public ctx;
  public chart;
  public chartData: any;
  public labels: string[];
  public values: number[];

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  constructor(
    public employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeList().pipe(
      map(x => (x.map(employee => ({ name: employee.firstName, remainingAnnualVacationDays: employee.remainingAnnualVacationDays }))))
    ).subscribe(res => {
      this.labels = Object.assign(res).map(x => x.name);
      this.values = Object.assign(res).map(x => x.remainingAnnualVacationDays);
      this.context = this.myCanvas.nativeElement.getContext('2d');
      this.createCharts();
    });
  }

  createCharts() {
    const myChart = new Chart(this.context, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: '',
          data: this.values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }


}
