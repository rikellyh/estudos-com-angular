import { Injectable } from "@angular/core";
import { Country } from "../types/units-response.interface";

@Injectable({
  providedIn: "root",
})
export class FilterUnitsService {
  constructor() {}

  // onRegionSelect(country: Country[]){
  //   let result = country;
  //   let selectedRegion = result;

  //   const selected = country.filter((item) =>
  //   selectedRegion.includes(item.region)
  // );

  // const notSelected = country.filter(
  //   (item) => !selectedRegion.includes(item.region)
  // );

  // return [...selected, ...notSelected];
  // }
}
