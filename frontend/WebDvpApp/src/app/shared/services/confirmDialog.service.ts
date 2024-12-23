import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmacionComponent } from '../components/confirmacion/confirmacion.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '300px',
      data: { message },
    });

    // Devuelve un Observable<boolean> que será true si el usuario confirma, o false si cancela
    return dialogRef.afterClosed();
  }
}
