import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/components/charts/charts.component';
import { EmployeeListComponent } from './employees/components/employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: EmployeeListComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
