import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarTableComponent } from '@components/car-table/car-table.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarTableComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
