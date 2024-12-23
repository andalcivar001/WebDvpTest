import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { SharedModule } from '../../module/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  usuario?: string;

  constructor(
    private _loalStorageService: LocalStorageService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.usuario = this._loalStorageService.getItem('usuario');
  }

  cerrarSesion() {
    this._loalStorageService.removeItem('email');
    this._loalStorageService.removeItem('token');
    this.usuario = undefined;
    this._router.navigate(['']);
  }
}
