import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from './reducers/app.reducer';
import * as authAction from './actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.State>,
  ) {}

  onLogout() {
    this.store.dispatch(new authAction.Logout());
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.selectIsAuth);
  }
  
  title = 'angular-app-five';
}
