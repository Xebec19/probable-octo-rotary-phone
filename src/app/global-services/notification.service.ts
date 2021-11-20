import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
    constructor(private _snackBar: MatSnackBar) {}
    notification(message: string, action: string = 'close') {
      this._snackBar.open(message, action);
    }
}