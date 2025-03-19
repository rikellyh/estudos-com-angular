import { Component, HostListener, OnInit, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgxPaginationModule } from "ngx-pagination";

import { Country } from "../../types/units-response.interface";
import { GetUnitsService } from "./../../services/get-units.service";
import { FilterUnitsService } from "../../services/filter-units.service";
import { StyleManagerService } from "../../services/style-manager.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  public countries: Country[] = [];
  public filteredCountries: Country[] = [];
  public uniqueRegions: string[] = [];
  public selectedRegion: string | null = null;
  page = 1;
  count = 0;
  pageSize = 8;
  currentIndex = -1;

  constructor(
    private unitService: GetUnitsService,
    private filterService: FilterUnitsService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  public getCountries(): void {
    this.unitService.getCountries().subscribe({
      next: (response: Country[]) => {
        this.countries = response;
        this.filteredCountries = response;
        this.count = this.filteredCountries.length;
        this.uniqueRegions = Array.from(
          new Set(this.countries.map((country) => country.region))
        );
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onRegionChange(region: string | null): void {
    if (region) {
      this.filterService.getCountriesByRegion(region).subscribe({
        next: (response: Country[]) => {
          this.filteredCountries = response;
          this.count = this.filteredCountries.length;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
    } else {
      this.getCountries();
    }
  }

  searchCountry(country: string) {
    country = country ? country.trim() : "";

    this.filteredCountries = this.countries.filter((item) => {
      return Object.values(item)
        .join("")
        .trim()
        .toLowerCase()
        .includes(country.trim().toLowerCase());
    });

    this.count = this.filteredCountries.length;
  }

  handlePageChange(event: number): void {
    this.page = event;
    // this.getCountries();
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  private styleManager = inject(StyleManagerService);

  get isDark(): boolean {
    return this.styleManager.isDark;
  }

  inside = false;
  touched =
    "1px solid var(--mdc-outlined-text-field-disabled-input-text-color)";

  onClick() {
    this.touched = "1px solid var(--mat-badge-background-color)";
    this.inside = true;
  }

  @HostListener("document:click")
  clickedOutside() {
    if (!this.inside) {
      this.touched =
        "1px solid var(--mdc-outlined-text-field-disabled-input-text-color)";
    }
    this.inside = false;
  }
}
