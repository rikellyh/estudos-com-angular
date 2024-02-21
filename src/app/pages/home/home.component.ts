import { Component, HostListener, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { StyleManagerService } from "../../services/style-manager.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatSelectModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  private styleManager = inject(StyleManagerService);
  isDark = this.styleManager.isDark;

  inside = false;
  touched =
    "2px solid var(--mdc-outlined-text-field-disabled-input-text-color)";

  onClick() {
    this.touched = "2px solid var(--mat-badge-background-color)";
    this.inside = true;
  }

  @HostListener("document:click")
  clickedOutside() {
    if (!this.inside) {
      this.touched =
        "2px solid var(--mdc-outlined-text-field-disabled-input-text-color)";
    }
    this.inside = false;
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
