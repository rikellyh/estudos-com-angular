import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { Country } from "../types/units-response.interface";

@Injectable({
  providedIn: "root",
})
export class FilterUnitsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`);
  }
}
