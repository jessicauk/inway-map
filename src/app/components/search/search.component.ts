import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostalService } from '../../api/postal.service';
import { CountryFacet } from '../../api/models';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, AsyncPipe],
})
export class SearchComponent implements OnInit {
  @Output() countryChange = new EventEmitter<string>();
  control = new FormControl<string | null>(null);
  countries$!: Observable<CountryFacet[]>;
  loading = true;

  constructor(private api: PostalService) {}

  ngOnInit(): void {
    this.countries$ = this.api.getCountries().pipe(
      map((list) => list.sort((a, b) => a.value.localeCompare(b.value))),
      tap(() => (this.loading = false))
    );

    // Emitir selección cuando cambie el valor (o si ya viene preseleccionado por ruta)
    this.control.valueChanges
      .pipe(debounceTime(0), startWith(this.control.value))
      .subscribe((v) => {
        const code = (v || '').toString().toUpperCase().trim();
        if (code.length === 2) this.countryChange.emit(code);
      });
  }

  trackByCode = (_: number, c: CountryFacet) => c.value;
}
