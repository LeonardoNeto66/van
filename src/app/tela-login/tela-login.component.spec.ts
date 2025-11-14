import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TelaLoginComponent } from './tela-login.component';

describe('TelaLoginComponent', () => {
  let component: TelaLoginComponent;
  let fixture: ComponentFixture<TelaLoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
      declarations: [TelaLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaLoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar erro se campos vazios', () => {
    component.user = '';
    component.password = '';
    component.onSubmit(new Event('submit'));
    expect(component.error).toBe('Preencha usuário e senha.');
  });

  it('deve navegar para /admin com credenciais corretas', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.user = 'admin';
    component.password = 'admin123';
    component.onSubmit(new Event('submit'));
    tick(700);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  }));
});
