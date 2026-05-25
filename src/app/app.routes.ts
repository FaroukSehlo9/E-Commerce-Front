import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth-guard';

export const routes: Routes = [
  // 1. المسار الافتراضي يحول للوجن
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. صفحة اللوجن (Lazy Loading) - مستقلة تماماً بدون Navbar
  {
    path: 'login',
    loadComponent: () => import('./Features/auth/login/login.component').then(m => m.Login)
  },

  // 3. هيكل لوحة التحكم (Admin Layout)
  {
    path: 'admin',
    // هنا بنادي الـ Layout اللي عملناه (الأب)
    loadComponent: () => import('./Shared/Layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        // هنا الداشبورد بتظهر كـ Child (ابن) جوه الـ Layout
        loadComponent: () => import('./Features/admin/component/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      {
        path:'AboutDeveloper',
        loadComponent:()=>import('./Features/about-developer/about-developer.component').then(m=>m.AboutDeveloperComponent)
      }
      // {
      //   path: 'products',
      //   // أي صفحة جديدة للأدمن هتضيفها هنا هتاخد الـ Navbar والـ Sidebar أوتوماتيك
      //   loadComponent: () => import('./Features/admin/products/products.component').then(m => m.ProductsComponent)
      // }
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
