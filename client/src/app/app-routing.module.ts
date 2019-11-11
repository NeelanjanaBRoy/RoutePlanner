import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JourneyComponent } from './journey/journey.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  { 
    path: 'dashboard', 
    redirectTo: 'rtlsdashboard/routes', 
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    // canActivate: [AuthGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [    
      {
        path:'routes',
        component: JourneyComponent,
        // canActivate: [AuthGuard],
      },                          
      {
          path:'favourites',
          component: FavouritesComponent,
          // canActivate: [AuthGuard],
      },
    ]
  } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
