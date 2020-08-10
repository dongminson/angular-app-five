import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../reducers/app.reducer';
import * as authAction from '../../actions/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password: string = '';
  email: string = '';

  constructor(
    private authService: AuthService,
    private store:Store<{app: fromApp.State}>,
  ) { }

  ngOnInit(): void {

  }
  
  onSubmit() {
    let auth = {
      email: this.email,
      password: this.password
    };
    if (this.authService.validateAuth(auth)) {
      this.store.dispatch(new authAction.Register(auth));
    }
  } 

}
