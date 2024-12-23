import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/module/shared.module';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../../../core/models/Persona.model';
import { PersonaService } from '../../../core/services/persona.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
@Component({
  selector: 'app-form-persona',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './form-persona.component.html',
  styleUrl: './form-persona.component.scss',
})
export class FormPersonaComponent {
  id?: number;
  personaData: Persona = this.limpiarData();
  tituloForm?: string;
  isLoading: boolean = false;
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    public dialogRef: MatDialogRef<FormPersonaComponent>,
    private _activatedRoute: ActivatedRoute,
    private _personaService: PersonaService,
    private _snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  limpiarData(): Persona {
    const persona = {
      id: 0,
      nombres: '',
      apellidos: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '',
      email: '',
    } as Persona;
    return persona;
  }
  ngOnInit() {
    if (this.data && this.data.id) {
      this.id = this.data.id;
      this.isLoading = true;
      this._personaService.obtenerPersonaPorId(this.id!).subscribe({
        next: (res: Persona) => {
          if (res !== null) {
            this.tituloForm = `Editando - ${res.nombreCompleto}`;
            this.personaData = { ...res };
          }
        },
        error: (error) => {
          this._snackBarService.error('Error al cargar datos de la Persona');
        },
      });
      this.isLoading = false;
    } else {
      this.tituloForm = 'Creando Persona';
    }
  }

  onCrearPersona() {
    if (!this.validarForm()) {
      return;
    }
    const data: Persona = {
      id: this.id!,
      nombres: this.personaData.nombres,
      apellidos: this.personaData.apellidos,
      email: this.personaData.email,
      tipoIdentificacion: this.personaData.tipoIdentificacion,
      numeroIdentificacion: this.personaData.numeroIdentificacion,
    };
    this.dialogRef.close(data);
  }

  validarForm(): boolean {
    const {
      nombres,
      apellidos,
      tipoIdentificacion,
      numeroIdentificacion,
      email,
    } = this.personaData;
    if (!nombres || nombres.trim() === '') {
      this._snackBarService.warning('Ingrese nombres');
      return false;
    }

    if (!apellidos || apellidos.trim() === '') {
      this._snackBarService.warning('Ingrese apellidos');
      return false;
    }

    if (!tipoIdentificacion || tipoIdentificacion.trim() === '') {
      this._snackBarService.warning('Ingrese tipo de identificacion');
      return false;
    }

    if (!numeroIdentificacion || numeroIdentificacion.trim() === '') {
      this._snackBarService.warning('Ingrese numero de identificacion');
      return false;
    }

    if (!email || email.trim() === '') {
      this._snackBarService.warning('Ingrese  email');
      return false;
    }

    const emailValido = this.emailPattern.test(email);
    if (!emailValido) {
      this._snackBarService.warning(
        'Email ingresado no es valido, favor verifique'
      );
      return false;
    }
    return true;
  }
  onCancelar(): void {
    this.dialogRef.close(); // Cierra el modal sin retornar nada
  }
}
