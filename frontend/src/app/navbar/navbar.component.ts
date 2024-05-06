import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  home() {
    this.router.navigateByUrl('');
  }

  devis() {
    this.router.navigateByUrl('/devis');
  }
}
