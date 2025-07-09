import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Navbar } from './layout/navbar/navbar';

import { Footer } from './layout/footer/footer';
import { ViewCustomer } from './components/view-customer/view-customer';
import { Usercomponent } from './components/usercomponent/usercomponent';
import { Viewallusercomponent } from './components/viewallusercomponent/viewallusercomponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Updateusercomponent } from './components/updateusercomponent/updateusercomponent';
import { ViewAllAccounts } from './components/view-all-accounts/view-all-accounts';

@NgModule({
  declarations: [
    App,
    Home,
    Navbar,  
    Footer, ViewCustomer, Usercomponent, Viewallusercomponent, Updateusercomponent, ViewAllAccounts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // notun project neyar por eta likhte hobe
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

    // notun project neyar por eta likhte hobe
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
