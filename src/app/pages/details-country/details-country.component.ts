import { GetUnitsService } from "./../../services/get-units.service";
import { Component, inject, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Country } from "../../types/units-response.interface";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { StyleManagerService } from "../../services/style-manager.service";

@Component({
  selector: "app-details-country",
  standalone: true,
  imports: [],
  templateUrl: "./details-country.component.html",
  styleUrl: "./details-country.component.css",
})
export class DetailsCountryComponent implements OnInit {
  country: Country | null = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private unitService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.getCountryDetails();
  }

  getCountryDetails() {
    const countryData = this.route.snapshot.paramMap.get("cca3");

    if (countryData) {
      this.unitService.getCountry(countryData).subscribe({
        next: (response: Country[]) => {
          if (response && response.length > 0) {
            this.country = response[0];
          } else {
            console.error("País não encontrado.");
            this.country = null;
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          this.country = null;
        },
      });
    }
  }

  backClicked() {
    this.location.back();
  }

  private styleManager = inject(StyleManagerService);

  get isDark(): boolean {
    return this.styleManager.isDark;
  }
}
