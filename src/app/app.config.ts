import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // ضفنا دول
import { routes } from './app.routes';
import { authInterceptor } from './Core/Interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // تسجيل الـ HttpClient مع الـ Interceptor
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
