import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { Addstudent } from './addstudent/addstudent';
import { Updatestudent } from './updatestudent/updatestudent';
import { Addlocation } from './location/addlocation/addlocation';
import { ViewAllLocation } from './location/view-all-location/view-all-location';
import { UpdateLocation } from './location/update-location/update-location';


const routes: Routes = [
{ path: '', component: Home },
{ path: 'm', component: Menu },
{path: 'view', component: ViewAllStudent},
{path: 'addstu', component: Addstudent},
{path: 'updatestudent/:id', component: Updatestudent},
{path: 'updatelocation/:id', component: UpdateLocation},
{path: 'allloc', component: ViewAllLocation},
{path: 'addloc', component: Addlocation},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
