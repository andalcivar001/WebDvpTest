import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { GridPersonaComponent } from './grid-persona/grid-persona.component';
import { FormPersonaComponent } from './form-persona/form-persona.component';

export const PERSONA_ROUTES: Routes = [
  {
    path: '',
    component: GridPersonaComponent,
  },
  {
    path: 'form',
    component: FormPersonaComponent,
  },
];
