import { RouterLink } from '@angular/router';
import { AuthService } from './../../../Core/Services/auth';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService=inject(AuthService);
  onLogout(){
    this.authService.logout();
  }
}
