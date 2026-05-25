import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GeneralResponse } from '../Models/general-response';
import { ILoginRequest, LoginResponse } from '../Models/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.currentUserSubject.asObservable();

  login(input: ILoginRequest): Observable<GeneralResponse<LoginResponse>> {
    return this.http.post<GeneralResponse<LoginResponse>>(`${this.baseUrl}/Auth/Login`, input)
      .pipe(
        tap(res => {
          if (res.success && res.resource?.token) {
            this.saveData(res.resource);
            this.currentUserSubject.next(true);
          }
        })
      );
  }

  private saveData(data: any) {
    localStorage.setItem('Token', data.token);
    localStorage.setItem('UserName', data.userName || '');
    localStorage.setItem('Role', data.role?.toString() || '');
    localStorage.setItem('UserId', data.userId || '');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('Token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(false);
    this.router.navigate(['/login']);
  }
}
