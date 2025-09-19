import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';


describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let comp: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('renderiza el botón', () => {
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(btn).toBeTruthy();                               
  });
});