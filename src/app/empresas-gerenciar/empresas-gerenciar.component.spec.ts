import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasGerenciarComponent } from './empresas-gerenciar.component';

describe('EmpresasGerenciarComponent', () => {
  let component: EmpresasGerenciarComponent;
  let fixture: ComponentFixture<EmpresasGerenciarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasGerenciarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasGerenciarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
