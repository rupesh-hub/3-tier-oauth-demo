import type {Routes} from "@angular/router"
import {LoginComponent} from "./pages/login/login.component"
import {RegisterComponent} from "./pages/register/register.component"
import {DashboardComponent} from "./pages/dashboard/dashboard.component"
import {CallbackComponent} from "./pages/callback/callback.component"
import {AuthGuard} from './pages/guards/auth.guard';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "callback", component: CallbackComponent},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "", redirectTo: "/dashboard", pathMatch: "full"},
]
