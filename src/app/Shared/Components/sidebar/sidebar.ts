import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // أضفنا RouterLinkActive
import { CommonModule } from '@angular/common'; // أضفنا CommonModule للـ ngFor
import { ADMIN_MENU } from '../../../Core/Config/admin-menu.config';

@Component({
  selector: 'app-sidebar',
  standalone: true, // تأكد من وجودها
  imports: [RouterLink, RouterLinkActive, CommonModule], // أضفنا المكتبات اللازمة
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = ADMIN_MENU;
}
