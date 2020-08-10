import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromApp from '../reducers/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromApp.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromApp.selectIsAuth).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(fromApp.selectIsAuth).pipe(take(1));
  }
}
