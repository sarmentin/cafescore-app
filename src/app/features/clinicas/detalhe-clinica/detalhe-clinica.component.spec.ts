import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheClinicaComponent } from './detalhe-clinica.component';

describe('DetalheClinicaComponent', () => {
  let component: DetalheClinicaComponent;
  let fixture: ComponentFixture<DetalheClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheClinicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
