import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Viewallusercomponent } from './components/viewallusercomponent/viewallusercomponent';
import { Usercomponent } from './components/usercomponent/usercomponent';
import { Updateusercomponent } from './components/updateusercomponent/updateusercomponent';
import { ViewAllAccounts } from './components/view-all-accounts/view-all-accounts';

const routes: Routes = [
  {path:'',component:Home},
  {path:'user',component:Usercomponent},
  {path:'viewalluser',component:Viewallusercomponent},
  {path:'updateuser/:id',component:Updateusercomponent},
  {path:'viewallaccount',component:ViewAllAccounts},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
