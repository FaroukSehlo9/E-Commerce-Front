import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// استيراد الـ Navbar والـ Sidebar بتوعك (تأكد من صحة المسارات)

import { Navbar } from '../../Components/navbar/navbar';
import { Sidebar } from '../../Components/sidebar/sidebar';
import { Footer } from '../../Components/footer/footer';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Sidebar,Footer],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
