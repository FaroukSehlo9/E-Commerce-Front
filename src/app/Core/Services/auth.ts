import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GeneralResponse } from '../Models/general-response';
import { ILoginRequest, LoginResponse } from '../Models/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router)
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  login(input: ILoginRequest): Observable<GeneralResponse<LoginResponse>> {
    return this.http.post<GeneralResponse<LoginResponse>>(`${this.baseUrl}/Auth/Login`, input)
      .pipe(
        tap(res => {
          // هنا بنكشف على success وبندخل جوه الـ resource
          if (res.success && res.resource?.token) {
            this.saveData(res.resource);
          }
        })
      );
  }

   saveData(data: any) {
    // التعديل هنا: الأسماء لازم تكون زي الـ JSON بالظبط
    // لاحظ: الـ API بيبعت userName و role
    localStorage.setItem('Token', data.token);
    localStorage.setItem('UserName', data.userName || '');
    localStorage.setItem('Role', data.role?.toString() || '');
    localStorage.setItem('UserId', data.userId || '');
  }



  isLoggedIn(): boolean {
    // تأكد إن اسم الـ Key هنا 'Token' بنفس حالة الأحرف اللي اتسيفت
    return !!localStorage.getItem('Token');
  }

  logout() {
  // 1. مسح كل البيانات المخزنة (التوكن، الرول، الاسم، إلخ)
  localStorage.clear();

  // 2. التحويل لصفحة اللوجن فوراً
  this.router.navigate(['/login']);
}
}
