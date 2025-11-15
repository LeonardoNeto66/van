import { Routes } from '@angular/router';
import { VanCadastroComponent } from './van-cadastro/van-cadastro.component';
import { EmpresasGerenciarComponent } from './empresas-gerenciar/empresas-gerenciar.component';
import { EscolasGerenciarComponent } from './escolas-gerenciar/escolas-gerenciar.component';

// Apenas exporte a constante
export const routes: Routes = [
  { path: 'cadastrar-van', component: VanCadastroComponent },
  { path: 'empresas', component: EmpresasGerenciarComponent },
  { path: 'escolas', component: EscolasGerenciarComponent },
  { path: '', redirectTo: 'cadastrar-van', pathMatch: 'full' }
];