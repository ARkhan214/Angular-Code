import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Addstudent } from './addstudent/addstudent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Updatestudent } from './updatestudent/updatestudent';
import { Addlocation } from './location/addlocation/addlocation';
import { UpdateLocation } from './location/update-location/update-location';
import { ViewAllLocation } from './location/view-all-location/view-all-location';
import { Registration } from './auth/registration/registration';
import { Login } from './auth/login/login';
import { Userprofile } from './auth/userprofile/userprofile';
import { Logout } from './auth/logout/logout';
import { Admin } from './auth/admin/admin';

@NgModule({
  declarations: [
    App,
    Home,
    Menu,
    ViewAllStudent,
    Addstudent,
    Updatestudent,
    Addlocation,
    UpdateLocation,
    ViewAllLocation,
    Registration,
    Login,
    Userprofile,
    Logout,
    Admin
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
