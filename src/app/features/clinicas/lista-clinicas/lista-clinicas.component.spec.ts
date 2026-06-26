import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClinicasComponent } from './lista-clinicas.component';

describe('ListaClinicasComponent', () => {
  let component: ListaClinicasComponent;
  let fixture: ComponentFixture<ListaClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaClinicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
