import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanCadastroComponent } from './van-cadastro.component';

describe('VanCadastroComponent', () => {
  let component: VanCadastroComponent;
  let fixture: ComponentFixture<VanCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
