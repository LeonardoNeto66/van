import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { VanCadastroComponent } from './van-cadastro/van-cadastro.component';
import { EmpresasGerenciarComponent } from './empresas-gerenciar/empresas-gerenciar.component';
import { EscolasGerenciarComponent } from './escolas-gerenciar/escolas-gerenciar.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'gerenciar-vans', component: VanCadastroComponent, data: { title: 'Gerenciar Vans' } },
  { path: 'empresas', component: EmpresasGerenciarComponent, data: { title: 'Empresas' } },
  { path: 'escolas', component: EscolasGerenciarComponent, data: { title: 'Escolas' } }
];