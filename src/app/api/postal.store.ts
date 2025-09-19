import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { PostalRecordFields } from './models';

@Injectable({ providedIn: 'root' })
export class PostalStore {
  readonly country$ = new BehaviorSubject<string | null>(null);
  readonly query$ = new BehaviorSubject<string>('');
  readonly results$ = new BehaviorSubject<PostalRecordFields[]>([]);
  readonly total$ = new BehaviorSubject<number>(0);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly selected$ = new BehaviorSubject<PostalRecordFields | null>(null);

  // Derivados útiles
  readonly hasSelection$ = this.selected$.pipe(map((s) => !!s));
  readonly vm$ = combineLatest([
    this.country$,
    this.query$,
    this.results$,
    this.total$,
    this.loading$,
    this.selected$,
  ]).pipe(
    map(([country, query, results, total, loading, selected]) => ({
      country,
      query,
      results,
      total,
      loading,
      selected,
    }))
  );

  reset() {
    this.country$.next(null);
    this.query$.next('');
    this.results$.next([]);
    this.total$.next(0);
    this.loading$.next(false);
    this.selected$.next(null);
  }
}
