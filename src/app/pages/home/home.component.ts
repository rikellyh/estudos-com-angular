import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { StyleManagerService } from '../../services/style-manager.service';
import { GetUnitsService } from './../../services/get-units.service';
import { Country } from '../../types/units-response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public countries: Country[] | undefined;

  constructor(private unitService: GetUnitsService) {}

  ngOnInit() {
    this.getCountries();
  }

  public getCountries(): void {
    this.unitService.getCountries().subscribe(
      (response: Country[]) => {
        this.countries = response;
        console.log(this.countries);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private styleManager = inject(StyleManagerService);
  isDark = this.styleManager.isDark;

  inside = false;
  touched =
    '1px solid var(--mdc-outlined-text-field-disabled-input-text-color)';

  onClick() {
    this.touched = '1px solid var(--mat-badge-background-color)';
    this.inside = true;
  }

  @HostListener('document:click')
  clickedOutside() {
    if (!this.inside) {
      this.touched =
        '1px solid var(--mdc-outlined-text-field-disabled-input-text-color)';
    }
    this.inside = false;
  }

  toggleDarkTheme() {
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
