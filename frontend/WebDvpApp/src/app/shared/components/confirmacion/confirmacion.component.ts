import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../module/shared.module';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.scss',
})
export class ConfirmacionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
