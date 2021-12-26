import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { ResultsComponent } from './views/results/results.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path:'dashboard',
    component: DashboardComponent
  },{
    path: 'results',
    component: ResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
