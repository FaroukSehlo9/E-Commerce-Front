export interface MenuItem {
  path: string;
  title: string;
  load: () => Promise<any>;
}

export const ADMIN_MENU: MenuItem[] = [
  {
    path: 'dashboard',
    title: 'لوحة التحكم',
    // تأكد من عدد الـ ../../ للوصول للمسار الصحيح
    load: () => import('../../Features/admin/component/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products',
    title: 'المنتجات',
    load: () => import('../../Features/admin/component/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'about-developer',
    title: 'عن المطور',
    load: () => import('../../Features/about-developer/about-developer.component').then(m => m.AboutDeveloperComponent)
  }
];
