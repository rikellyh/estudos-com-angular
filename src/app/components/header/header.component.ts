import { Component, inject } from '@angular/core';
import { StyleManagerService } from '../../services/style-manager.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private styleManager = inject(StyleManagerService);
  isDark = this.styleManager.isDark;

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
