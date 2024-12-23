import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { Token } from '../../core/models/Auth.model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  usuario?: string;
  password?: string;
  localStorageKey: string = 'token';
  localStorageusuario: string = 'usuario';
  hide = true;
  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService,
    public dialog: MatDialog,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit() {}

  onClickIngresar() {
    if (!this.usuario || this.usuario.trim() === '') {
      this._snackBarService.warning('Ingrese el usuario');
      return;
    }

    if (!this.password || this.password.trim() === '') {
      this._snackBarService.warning('Ingrese el password');
      return;
    }
    this._authService.login(this.usuario!, this.password!).subscribe({
      next: (res: Token) => {
        console.log('res', res);
        if (res !== null) {
          this.redireccionarPersona(res.token);
        }
      },
      error: (error) => {
        console.log(error);
        this._snackBarService.error(error);
      },
    });
  }

  redireccionarPersona(token: string) {
    this._localStorageService.removeItem(this.localStorageKey);
    this._localStorageService.removeItem(this.localStorageusuario);
    this._localStorageService.setItem(this.localStorageKey, token);
    this._localStorageService.setItem(this.localStorageusuario, this.usuario);
    this._router.navigateByUrl('/personas');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.token && data.token != '') {
        this.usuario = data.username;
        this.redireccionarPersona(data.token);
      }
    });
  }
}
