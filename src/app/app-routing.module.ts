import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PollsComponent } from './polls/polls.component';
import { PollComponent } from './poll/poll.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [ 
    { path: '', component: PollComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'polls', component: PollsComponent, canActivate: [AuthGuard]},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}