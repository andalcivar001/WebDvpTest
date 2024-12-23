// snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private config: MatSnackBarConfig = {
    duration: 5000, // Duración por defecto: 3 segundos
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000) {
    this.config.duration = duration;
    this.config.panelClass = ['success-snackbar'];
    this.snackBar.open(message, 'X', this.config);
  }

  error(message: string, duration: number = 3000) {
    this.config.duration = duration;
    this.config.panelClass = ['error-snackbar'];
    this.snackBar.open(message, 'X', this.config);
  }

  warning(message: string, duration: number = 3000) {
    this.config.duration = duration;
    this.config.panelClass = ['warning-snackbar'];
    this.snackBar.open(message, 'X', this.config);
  }
}
