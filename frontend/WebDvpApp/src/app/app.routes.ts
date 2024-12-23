import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'personas',
    loadChildren: () =>
      import('./components/persona/persona.routes').then(
        (m) => m.PERSONA_ROUTES
      ),
  },
];
