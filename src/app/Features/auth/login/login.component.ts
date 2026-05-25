import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/Services/auth';
import { ILoginRequest } from '../../../Core/Models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  errorMessage: string = '';
  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['1', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const loginData: ILoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    const selectedRole = Number(this.loginForm.value.userRole);

    this.authService.login(loginData).subscribe({
      next: (res) => {
        // 1. اقفل الـ Loading فوراً بمجرد وصول الرد
        this.isLoading = false;

        if (res.success && res.resource?.token) {
          const apiRole = Number(res.resource.role);

          // 2. التحقق من الـ Role
          if (apiRole !== selectedRole) {
            this.errorMessage = "عفواً، لا تملك صلاحية الدخول بهذا المستوى";

            // نمسح التوكن من الـ Storage فقط للأمان بدون ما نعمل Navigate أو Reload
            localStorage.removeItem('Token');

            // أجبر الأنجولار يظهر الرسالة فوراً
            this.cdr.detectChanges();
            return;
          }

          // 3. لو كله تمام، احفظ وكمل
          this.authService.saveData(res.resource);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = res.message || 'بيانات الدخول غير صحيحة';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        // 4. في حالة الخطأ، اقفل الـ Loading واظهر الرسالة
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'خطأ في البريد الإلكتروني أو كلمة المرور';
        this.cdr.detectChanges();
        console.error('Login Error:', err);
      }
    });
  }
}
