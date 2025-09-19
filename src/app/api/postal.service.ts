import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CountryFacet, PostalQueryResult, PostalRecordFields } from './models';
import { environment } from '../environments/env';

@Injectable({ providedIn: 'root' })
export class PostalService {
  private base = `${environment.odsBaseUrl}`;
  private dataset = environment.odsDataset;

  constructor(private http: HttpClient) {}

  // Codigos de país (country_code)
  getCountries(limit = 300): Observable<CountryFacet[]> {
    const url = `${this.base}/${this.dataset}/facets`;
    const params = new HttpParams().set('facet', 'country_code').set('limit', limit);
    return this.http.get<any>(url, { params }).pipe(
      map((res) => {
        const facetGroup =
          (res?.facets || []).find((f: any) => f.name === 'country_code') || res?.facets?.[0];
        const list = facetGroup?.facets || [];
        return list.map((f: any) => ({
          value: f.value,
          name: f.name,
          count: f.count,
        })) as CountryFacet[];
      })
    );
  }

  // Registros por país
  getPostalCodesByCountry(
    countryCode: string,
    opts?: {
      limit?: number;
      offset?: number;
      orderBy?: string;
      select?: string;
      where?: string;
      search?: string;
    }
  ): Observable<PostalQueryResult> {
    const url = `${environment.odsBaseUrl}/geonames-postal-code/records`;
    let params = new HttpParams().set('refine', `country_code:"${countryCode}"`);

    if (opts?.limit) params = params.set('limit', opts.limit);
    if (opts?.offset) params = params.set('offset', opts.offset);
    if (opts?.orderBy) params = params.set('order_by', opts.orderBy);

    return this.http.get<any>(url, { params }).pipe(
      map((res) => ({
        total_count: res.total_count,
        results: res.results ?? [],
      }))
    );
  }
}
