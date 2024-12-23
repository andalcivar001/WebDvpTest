import { Component, signal } from '@angular/core';
import { SharedModule } from '../../shared/module/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { Token } from '../../core/models/Auth.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username?: string;
  password?: string;
  passwordConfirmacion?: string;
  hide = signal(true);
  hideConfirmacion = signal(true);
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private _authService: AuthService,
    private _snackBarService: SnackbarService
  ) {}
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  clickEventConfirmacion(event: MouseEvent) {
    this.hideConfirmacion.set(!this.hideConfirmacion());
    event.stopPropagation();
  }
  onCrearUsuario() {
    if (!this.username || this.username.trim() === '') {
      this._snackBarService.warning('Ingrese el usuario');
      return;
    }
    if (!this.password || this.password.trim() === '') {
      this._snackBarService.warning('Ingrese password');
      return;
    }
    if (!this.passwordConfirmacion || this.passwordConfirmacion.trim() === '') {
      this._snackBarService.warning('Ingrese password de confirmación');
      return;
    }
    if (this.password !== this.passwordConfirmacion) {
      this._snackBarService.warning('password y confirmación no son iguales');
      return;
    }

    const regexLower = /[a-z]/; // Al menos una letra minúscula
    const regexUpper = /[A-Z]/; // Al menos una letra mayúscula
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>_]/; // Al menos un carácter especial
    const regexNumber = /\d/;
    // Comprobamos cada uno de los requisitos
    if (this.password.length < 6) {
      this._snackBarService.warning(
        'El password debe tener al menos 6 caracteres'
      );
      return;
    }
    if (!regexLower.test(this.password)) {
      this._snackBarService.warning(
        'La contraseña debe contener al menos una letra minúscula'
      );
      return;
    }
    if (!regexUpper.test(this.password)) {
      this._snackBarService.warning(
        'El password debe contener al menos una letra mayúscula.'
      );
      return;
    }
    if (!regexSpecial.test(this.password)) {
      this._snackBarService.warning(
        'El password debe contener al menos un carácter especial.'
      );
      return;
    }

    if (!regexNumber.test(this.password)) {
      this._snackBarService.warning(
        'El password debe tener contener al menos un numero de entre 0 al 9'
      );
      return;
    }

    this.isLoading = true;
    this._authService.register(this.username!, this.password!).subscribe({
      next: (res: Token) => {
        this._snackBarService.success('Usuario creado correctamente');
        this.dialogRef.close({ token: res.token, username: this.username });
      },
      error: (error) => {
        this._snackBarService.error(error.error);
      },
      complete: () => {},
    });
    this.isLoading = false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
