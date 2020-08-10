import {AuthData } from '../models/auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as fromApp from '../reducers/app.reducer';
import { PollService } from './poll.service';
import { AlertService } from './alert.service';
import { validEmail } from '../utils/app.utils';
import { from } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth,
        private store: Store<fromApp.State>,
        private pollService: PollService,
        private alertService: AlertService,
    ) { }

    registerUser(authData: AuthData) {
        return from(this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ));
    }

    logout() {
        return from(this.afAuth.auth.signOut());
    }

    login(authData: AuthData) {
        return from(this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password
        ));
    }

    validateAuth(auth:AuthData) {
        if (auth.password.length < 6) {
            this.alertService.handleError({message: 'Passwords must be at least 6 characters long.'});
            return false;
        }
        if (!validEmail(auth.email)) {
            this.alertService.handleError({message: 'You must enter a correct email.'});
            return false;
        }
        return true;
    }

    authRedirection(route: string) {
        this.router.navigate([route]);
    }
}