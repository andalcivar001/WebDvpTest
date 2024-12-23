import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Persona, ResponsePersona } from '../models/Persona.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  token?: string;
  address: string = environment.apiRoot + '/Persona';

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  private getHeaders(): HttpHeaders {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this._localStorageService.getItem('token')}`, // Enviar el token en los encabezados
    });
    return header;
  }

  obtenerPersonas(): Observable<Persona[]> {
    return this._http.get(`${this.address}`, {
      headers: this.getHeaders(),
    }) as Observable<Persona[]>;
  }

  obtenerPersonaPorId(id: number): Observable<Persona> {
    return this._http.get(`${this.address}/${id}`, {
      headers: this.getHeaders(),
    }) as Observable<Persona>;
  }

  crearPersona(persona: Persona): Observable<ResponsePersona> {
    return this._http.post(this.address, persona, {
      headers: this.getHeaders(),
    }) as Observable<ResponsePersona>;
  }

  actualizarPersona(id: number, persona: Persona): Observable<ResponsePersona> {
    return this._http.put(`${this.address}/${id}`, persona, {
      headers: this.getHeaders(),
    }) as Observable<ResponsePersona>;
  }

  eliminarPersona(id: number): Observable<ResponsePersona> {
    return this._http.delete(`${this.address}/${id}`, {
      headers: this.getHeaders(),
    }) as Observable<ResponsePersona>;
  }
}
