import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-developer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-developer.component.html',
  styleUrls: ['./about-developer.component.css']
})
export class AboutDeveloperComponent {
  // البيانات الأساسية
  developerInfo = {
    name: 'فاروق ابوبكر فاروق عبدالسميع ',
    title: 'Full-Stack Web Developer (.NET & Angular)',
    bio: 'أنا مبرمج شغوف ببناء تطبيقات ويب متكاملة وعالية الأداء، أهتم جداً بكتابة Clean Code وتطبيق مبادئ الـ SOLID لضمان استدامة المشاريع.',
    currentYear: new Date().getFullYear()
  };

  // قائمة المهارات
  skills = [
    { name: '.NET Core Web API', category: 'Backend' },
    { name: 'Entity Framework Core', category: 'Backend' },
    { name: 'Angular (v15+)', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'SQL Server & Normalization', category: 'Database' }
  ];

  // بيانات المشروع الحالي
  currentProject = {
    name: 'E-commerce Platform',
    features: [
      'Advanced Authentication (OTP)',
      'Backend Repository Pattern',
      'Lazy Loading & Standalone Components',
      'SweetAlert2 & Loading Interceptors'
    ]
  };

  // روابط التواصل
  socialLinks = {
    //linkedin: 'https://linkedin.com/in/your-profile',
    github: 'https://github.com/FaroukSehlo9'
  };
}
