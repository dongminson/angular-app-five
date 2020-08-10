import { Injectable } from '@angular/core';
import { Error } from '../models/error.model';
import { Success } from '../models/success.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(
    private snackbar: MatSnackBar,
  ) {}

  handleError(err:Error) {
    this.snackbar.dismiss();
    this.snackbar.open(err.message, null, {duration: 3000, panelClass: ['mat-toolbar', 'mat-warn']});
  }

  handleSuccess(succ:Success) {
    this.snackbar.dismiss();
    this.snackbar.open(succ.message, null, {duration: 3000, panelClass: ['mat-toolbar', 'mat-primary']});
  }
}