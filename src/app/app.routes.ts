import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth-guard';
import { loginGuard } from './Core/Guards/login.guard';
import { ADMIN_MENU } from './Core/Config/admin-menu.config';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./Features/auth/login/login.component').then(m => m.Login),
    canActivate: [loginGuard]
  },

  {
    path: 'admin',
    loadComponent: () => import('./Shared/Layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // التوليد الديناميكي للمسارات
      ...ADMIN_MENU.map(item => ({
        path: item.path,
        loadComponent: item.load
      }))
    ]
  },

  {
    path: '404',
    loadComponent: () => import('./Shared/Components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: '404' }
];
