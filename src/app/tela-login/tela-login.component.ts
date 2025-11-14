import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent {
  user = '';
  password = '';
  error = '';
  isSubmitting = false;

  constructor(private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';

    if (!this.user || !this.password) {
      this.error = 'Preencha usuário e senha.';
      return;
    }

    this.isSubmitting = true;

    // Exemplo simples: substituir por chamada real ao backend
    setTimeout(() => {
      this.isSubmitting = false;

      // credenciais de exemplo: admin / admin123
      if (this.user === 'admin' && this.password === 'admin123') {
        // navegue para rota administrativa
        this.router.navigate(['/admin']).catch(() => {});
      } else {
        this.error = 'Usuário ou senha incorretos.';
      }
    }, 700);
  }
}
