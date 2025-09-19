import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { PostalService } from '../../api/postal.service';

class PostalServiceMock {
  getCountries() {
    return of([{ value: 'CL', count: 1 }, { value: 'MX', count: 2 }]);
  }
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let comp: SearchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [{ provide: PostalService, useClass: PostalServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('seleccionar un country code', () => {
    spyOn(comp.countryChange, 'emit');
    comp.control.setValue('MX'); // simula selección
    expect(comp.countryChange.emit).toHaveBeenCalledWith('MX');
  });
});