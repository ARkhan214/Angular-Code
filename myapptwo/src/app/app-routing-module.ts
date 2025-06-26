import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { ViewAllStudent } from './view-all-student/view-all-student';

const routes: Routes = [
{ path: 'h', component: Home },
{ path: 'm', component: Menu },
{path: 'view', component: ViewAllStudent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
