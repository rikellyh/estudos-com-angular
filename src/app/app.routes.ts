import { Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { DetailsCountryComponent } from "./pages/details-country/details-country.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "detailsCountry", component: DetailsCountryComponent },
];
