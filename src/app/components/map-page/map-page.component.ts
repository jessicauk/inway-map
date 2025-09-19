// src/app/features/map-page/map-page.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { PostalService } from '../../api/postal.service';
import { PostalStore } from '../../api/postal.store';
import { Subject, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { SearchComponent } from '../../components/search/search.component';
import { TableComponent } from '../../components/table/table.component';
import { MapComponent } from '../map/map.component';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostalRecordFields } from '../../api/models';

interface Vm {
  country: string | null;
  query: string;
  results: PostalRecordFields[];
  total: number;
  loading: boolean;
  selected: PostalRecordFields | null;
}

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  imports: [
    SearchComponent,
    TableComponent,
    MapComponent,
    ButtonComponent,
    MatToolbarModule,
    CommonModule,
    AsyncPipe,
  ],
})
export class MapPageComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  vm$: Observable<Vm>;

  constructor(private api: PostalService, public store: PostalStore) {
    this.vm$ = this.store.vm$;
    this.store.country$
      .pipe(
        tap(() => this.store.loading$.next(true)),
        switchMap((cc) =>
          cc
            ? this.api.getPostalCodesByCountry(cc, {
                orderBy: 'postal_code',
                select: 'country_code,postal_code,place_name,latitude,longitude,geo_point_2d',
              })
            : []
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((res: any) => {
        if (!res) return;
        this.store.results$.next(res.results || []);
        this.store.total$.next(res.total_count || 0);
        this.store.loading$.next(false);
      });
  }

  onSelectRow(row: any) {
    console.log('Fila seleccionada:', row);
    this.store.selected$.next(row);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
