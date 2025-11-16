import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FakeApiService } from '../services/fakeapiservice/fake-api.service';
import { Empresa } from '../models/empresa.model';
import { Van } from '../models/van.model';




@Component({
  selector: 'app-empresas-gerenciar',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './empresas-gerenciar.component.html',
  styleUrls: ['./empresas-gerenciar.component.css']
})
export class EmpresasGerenciarComponent implements OnInit {
  empresas: Empresa[] = [];
  vans: Van[] = [];
  selected?: Empresa;

  newEmpresa = {
    nome: '',
    nomeFantasia: '',
    cnpj: '',
    responsavelLegal: '',
    cpfResponsavel: '',
    dataAbertura: '',
    endereco: '',
    telefone: ''
  };

  constructor(private api: FakeApiService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.empresas = this.api.listEmpresas();
    this.vans = this.api.listVans();
    if (this.selected) {
      this.selected = this.api.getEmpresa(this.selected.id);
    }
  }

  selectEmpresa(id: string) {
    this.selected = this.api.getEmpresa(id);
  }

  createEmpresa() {
    const payload = { ...this.newEmpresa };
    if (!payload.nome.trim() || !payload.cnpj.trim()) return;

    const created = this.api.createEmpresa({
      nome: payload.nome.trim(),
      nomeFantasia: payload.nomeFantasia?.trim(),
      cnpj: payload.cnpj.trim(),
      responsavelLegal: payload.responsavelLegal?.trim(),
      cpfResponsavel: payload.cpfResponsavel?.trim(),
      dataAbertura: payload.dataAbertura ? new Date(payload.dataAbertura).toISOString() : undefined,
      endereco: payload.endereco?.trim(),
      telefone: payload.telefone?.trim()
    });

    this.newEmpresa = {
      nome: '',
      nomeFantasia: '',
      cnpj: '',
      responsavelLegal: '',
      cpfResponsavel: '',
      dataAbertura: '',
      endereco: '',
      telefone: ''
    };

    this.refresh();
    this.selectEmpresa(created.id);
  }

  deleteEmpresa(id: string) {
    if (!confirm('Excluir esta empresa?')) return;
    this.api.deleteEmpresa(id);
    if (this.selected?.id === id) this.selected = undefined;
    this.refresh();
  }

  getVanPlaca(vid: string): string {
    return this.vans.find(v => v.id === vid)?.placa || '—';
  }

  getVanModelo(vid: string): string {
    return this.vans.find(v => v.id === vid)?.marcaModelo || '—';
  }
}


