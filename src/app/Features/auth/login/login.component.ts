import { Component, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Core/Services/auth';
import { ILoginRequest } from '../../../Core/Models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // ميثود توزيع المسارات حسب الرول
  private redirectToRolePage(role: string | number) {
    const roleRoutes: { [key: string]: string } = {
      '1': '/admin/dashboard',
      '2': '/manager/dashboard',
      '3': '/customer/home'
    };

    const route = roleRoutes[role.toString()] || '/404';
    this.router.navigate([route]);
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
        this.isLoading = false;

        if (res.success && res.resource?.token) {
          const apiRole = Number(res.resource.role);

          if (apiRole !== selectedRole) {
            this.errorMessage = "عفواً، لا تملك صلاحية الدخول بهذا المستوى";
            localStorage.removeItem('Token');
            this.cdr.detectChanges();
            return;
          }

          // التوجيه الذكي بناءً على الرول الحقيقي من الـ API
          this.redirectToRolePage(apiRole);

        } else {
          this.errorMessage = res.message || 'بيانات الدخول غير صحيحة';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'خطأ في الاتصال بالسيرفر';
        this.cdr.detectChanges();
      }
    });
  }
}
