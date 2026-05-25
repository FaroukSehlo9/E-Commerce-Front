import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. نجيب التوكن من الـ LocalStorage
  const token = localStorage.getItem('Token');

  // 2. لو التوكن موجود، نعدل الطلب ونضيف الهيدر
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': localStorage.getItem('Lang') ?? 'en-us' // بالمرة نبعت اللغة اللي كانت في كودك القديم
      }
    });
    return next(authReq);
  }

  // 3. لو مفيش توكن، نمرر الطلب زي ما هو (مثلاً طلب الـ Login)
  return next(req);
};
