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
import { Registration } from './auth/registration/registration';
import { Login } from './auth/login/login';
import { Userprofile } from './auth/userprofile/userprofile';
import { Logout } from './auth/logout/logout';
import { Admin } from './auth/admin/admin';
import { UserGurd } from './guards/user-guard';
import { AdminGuard } from './guards/admin-guard';
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
{ path: '', component: Home },
{ path: 'm', component: Menu },
{path: 'view', component: ViewAllStudent,canActivate:[AdminGuard]},
{path: 'addstu', component: Addstudent,canActivate:[AuthGuard]},
{path: 'updatestudent/:id', component: Updatestudent},
{path: 'updatelocation/:id', component: UpdateLocation},
{path: 'allloc', component: ViewAllLocation,canActivate:[AdminGuard]},
{path: 'addloc', component: Addlocation,canActivate:[AdminGuard]},
{path: 'reg', component: Registration},
{path: 'userprofile', component: Userprofile,canActivate:[UserGurd]},
{path: 'login', component: Login},
{path: 'logout', component: Logout},
{path: 'adminprofile', component:Admin,canActivate:[AdminGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
