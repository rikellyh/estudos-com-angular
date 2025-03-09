import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, RouterLink } from "@angular/router";
import { StyleManagerService } from "./services/style-manager.service";
@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [CommonModule, RouterOutlet, RouterLink],
})
export class AppComponent {
  title = "learning-angular";

  private styleManager = inject(StyleManagerService);
  isDark = this.styleManager.isDark;

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
