import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // لو هو داخل فعلاً، وديه للرئيسية (أو الـ Dashboard) وماتخليهوش يشوف صفحة اللوجن
  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }

  // لو مش داخل، سيبه يفتح صفحة اللوجن عادي
  return true;
};
