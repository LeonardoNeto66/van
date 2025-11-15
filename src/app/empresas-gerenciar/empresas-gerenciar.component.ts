import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../services/fakeapiservice/fake-api.service'; // Caminho corrigido
import { Empresa } from '../models/empresa.model'; // Caminho corrigido
import { Van } from '../models/van.model'; // Caminho corrigido
// 1. Importe CommonModule, FormsModule e DatePipe
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresas-gerenciar',
  standalone: true, // 2. Adicione
  imports: [CommonModule, FormsModule, DatePipe], // 3. Adicione (DatePipe para o | date)
  templateUrl: './empresas-gerenciar.component.html',
  styleUrls: ['./empresas-gerenciar.component.css']
})
export class EmpresasGerenciarComponent implements OnInit {
  empresas: Empresa[] = [];
  vans: Van[] = [];
  selected?: Empresa;
  newEmpresaName = '';
  constructor(private api: FakeApiService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.empresas = this.api.listEmpresas();
    this.vans = this.api.listVans();
  }

  selectEmpresa(id: string) {
    this.selected = this.api.getEmpresa(id);
  }

  createEmpresa() {
    if (!this.newEmpresaName.trim()) return;
    this.api.createEmpresa({ nome: this.newEmpresaName });
    this.newEmpresaName = '';
    this.refresh();
  }

  deleteEmpresa(id: string) {
    if (!confirm('Deseja excluir definitivamente esta empresa e suas vans?')) return;
    this.api.deleteEmpresa(id);
    this.refresh();
    this.selected = undefined;
  }
}
