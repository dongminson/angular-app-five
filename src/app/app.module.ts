import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PollComponent } from './poll/poll.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { PollsComponent } from './polls/polls.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducers/app.reducer';
import { PollEffects } from './effects/poll.effect';
import { AuthEffects } from './effects/auth.effect';


@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    SignupComponent,
    LoginComponent,
    PollsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    EffectsModule.forRoot([PollEffects, AuthEffects]),
    StoreModule.forRoot(appReducer)
  ], 
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
