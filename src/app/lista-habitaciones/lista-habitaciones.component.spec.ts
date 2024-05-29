import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHabitacionesComponent } from './lista-habitaciones.component';

describe('ListaHabitacionesComponent', () => {
  let component: ListaHabitacionesComponent;
  let fixture: ComponentFixture<ListaHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHabitacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
