import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth-guard';
import { loginGuard } from './Core/Guards/login.guard';

export const routes: Routes = [
  // 1. المسار الافتراضي يوجه للداشبورد مباشرة
  // إذا كان اليوزر غير مسجل، الـ authGuard في مسار 'admin' سيقوم بتحويله للوجن تلقائياً
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },

  // 2. صفحة اللوجن (محمية بـ loginGuard لمنع الدخول إذا كان اليوزر مسجل بالفعل)
  {
    path: 'login',
    loadComponent: () => import('./Features/auth/login/login.component').then(m => m.Login),
    canActivate: [loginGuard]
  },

  // 3. هيكل لوحة التحكم (Admin Layout)
  {
    path: 'admin',
    loadComponent: () => import('./Shared/Layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard], // ممنوع الدخول بدون توكن
    children: [
      // لو دخل رابط /admin فقط، يتم توجيهه للداشبورد
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadComponent: () => import('./Features/admin/component/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'AboutDeveloper',
        loadComponent: () => import('./Features/about-developer/about-developer.component').then(m => m.AboutDeveloperComponent)
      }
    ]
  },

  // 4. صفحة الخطأ 404
  {
    path: '404',
    loadComponent: () => import('./Shared/Components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

  // 5. أي مسار غير معروف يحول لـ 404
  { path: '**', redirectTo: '404' }
];
