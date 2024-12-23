import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SharedModule } from '../../../shared/module/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { formatDate } from '@angular/common';
import { Persona, ResponsePersona } from '../../../core/models/Persona.model';
import { PersonaService } from '../../../core/services/persona.service';
import { FormPersonaComponent } from '../form-persona/form-persona.component';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ConfirmationDialogService } from '../../../shared/services/confirmDialog.service';

@Component({
  selector: 'app-grid-persona',
  standalone: true,
  imports: [NavbarComponent, SharedModule],
  templateUrl: './grid-persona.component.html',
  styleUrl: './grid-persona.component.scss',
})
export class GridPersonaComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  arrayPersonas: Persona[] = [];
  dataSource!: MatTableDataSource<Persona>;
  isLoading: boolean = false;
  columnasAMostrar = [
    'id',
    'nombreCompleto',
    'numeroIdentificacion',
    'tipoIdentificacion',
    'email',
    'fechaCreacion',
    'acciones',
  ];
  constructor(
    private _personaService: PersonaService,
    private _router: Router,
    public dialog: MatDialog,
    private _localStorageService: LocalStorageService,
    private _snackBarService: SnackbarService,
    private _confirmacionDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    const token = this._localStorageService.getItem('token');
    if (!token) {
      this._snackBarService.error('Usuario no ha iniciado sesion');
      this._router.navigateByUrl('');
      return;
    }

    this.obtenerDatos();
  }

  obtenerDatos() {
    this.isLoading = true;
    this._personaService.obtenerPersonas().subscribe({
      next: (res) => {
        if (res === null) res = [];
        this.arrayPersonas = [...res];
        this.dataSource = new MatTableDataSource(this.arrayPersonas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        this._snackBarService.error(error.error.message);
      },
    });
    this.isLoading = false;
  }

  filtrarGrid(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onCrearPersona() {
    const dialogRef = this.dialog.open(FormPersonaComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const persona = result as Persona;
      this.isLoading = true;
      this._personaService.crearPersona(persona).subscribe({
        next: (res: ResponsePersona) => {
          this._snackBarService.success('Creado con exito');
          this.arrayPersonas.push(res.data!);
          this.obtenerDatos();
        },
        error: (error) => {
          this._snackBarService.error(error.error.message);
        },
      });
    });
    this.isLoading = false;
  }

  dateFormatter(value: Date): string {
    return formatDate(value, 'yyyy/MM/dd HH:mm:ss', 'en-US');
  }

  onEditarPersona(id: number) {
    const dialogRef = this.dialog.open(FormPersonaComponent, {
      width: '500px',
      height: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      const persona = result as Persona;
      this.isLoading = true;
      this._personaService.actualizarPersona(id, persona).subscribe({
        next: (res: ResponsePersona) => {
          this._snackBarService.success('Editado con exito');
          this.arrayPersonas.push(res.data!);
          this.obtenerDatos();
        },
        error: (error) => {
          this._snackBarService.error(error.error.message);
        },
      });
    });
    this.isLoading = false;
  }

  onEliminarPersona(id: number) {
    this._confirmacionDialogService
      .openConfirmationDialog('¿Estás seguro de que quieres eliminar?')
      .subscribe((result) => {
        if (result) {
          this.isLoading = true;
          this._personaService.eliminarPersona(id).subscribe({
            next: (res) => {
              this.obtenerDatos();
              this._snackBarService.success('Eliminado con exito');
            },
            error: (error) => {
              this._snackBarService.error(error.error.message);
            },
          });
          this.isLoading = false;
        }
      });
  }
}
