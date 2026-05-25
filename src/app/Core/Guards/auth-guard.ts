import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // مسموح له يدخل
  } else {
    // التعديل: نحفظ الـ URL اللي كان عايز يروح له (اختياري بس مفيد جداً)
    // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    // الحل المباشر بتاعك:
    router.navigate(['/login']);
    return false;
  }
};
