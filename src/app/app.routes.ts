import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clinicas',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./features/auth/registro/registro.component').then(m => m.RegistroComponent)
      }
    ]
  },
  {
    path: 'clinicas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/clinicas/lista-clinicas/lista-clinicas.component').then(m => m.ListaClinicasComponent)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/clinicas/detalhe-clinica/detalhe-clinica.component').then(m => m.DetalheClinicaComponent)
      }
    ]
  },
  {
    path: 'avaliacoes',
    canActivate: [authGuard],
    children: [
      {
        path: 'minhas',
        loadComponent: () =>
          import('./features/avaliacoes/minhas-avaliacoes/minhas-avaliacoes.component').then(m => m.MinhasAvaliacoesComponent)
      },
      {
        path: 'nova/:clinicaId',
        loadComponent: () =>
          import('./features/avaliacoes/form-avaliacao/form-avaliacao.component').then(m => m.FormAvaliacaoComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'clinicas'
  }
];