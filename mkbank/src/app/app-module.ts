import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Navbar } from './layout/navbar/navbar';

import { Footer } from './layout/footer/footer';
import { ViewCustomer } from './components/view-customer/view-customer';
import { Usercomponent } from './components/usercomponent/usercomponent';

@NgModule({
  declarations: [
    App,
    Home,
    Navbar,  
    Footer, ViewCustomer, Usercomponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
