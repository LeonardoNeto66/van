import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FakeApiService } from '../services/fakeapiservice/fake-api.service';
import { Empresa } from '../models/empresa.model';
import { Van } from '../models/van.model';

type EmpresaFormData = {
  nome: string;
  nomeFantasia: string;
  cnpj: string;
  responsavelLegal: string;
  cpfResponsavel: string;
  dataAbertura: string;
  endereco: string;
  telefone: string;
};

@Component({
  selector: 'app-empresas-gerenciar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas-gerenciar.component.html',
  styleUrls: ['./empresas-gerenciar.component.css']
})
export class EmpresasGerenciarComponent implements OnInit {
  empresas: Empresa[] = [];
  vans: Van[] = [];
  selected?: Empresa;
  isEditing = false;

  newEmpresa: EmpresaFormData = this.createEmptyForm();
  editEmpresa: EmpresaFormData = this.createEmptyForm();

  constructor(private api: FakeApiService) {}

  ngOnInit() {
    this.refresh();
  }

  get canSubmitNew(): boolean {
    const f = this.newEmpresa;
    return this.isFilled(f.nome) &&
      this.isFilled(f.nomeFantasia) &&
      this.isFilled(f.cnpj) &&
      this.isFilled(f.responsavelLegal) &&
      this.isFilled(f.cpfResponsavel) &&
      !!f.dataAbertura &&
      this.isFilled(f.endereco) &&
      this.isFilled(f.telefone);
  }

  get canSaveEdition(): boolean {
    const f = this.editEmpresa;
    return this.isFilled(f.nome) &&
      this.isFilled(f.nomeFantasia) &&
      this.isFilled(f.cnpj) &&
      this.isFilled(f.responsavelLegal) &&
      this.isFilled(f.cpfResponsavel) &&
      !!f.dataAbertura &&
      this.isFilled(f.endereco) &&
      this.isFilled(f.telefone);
  }

  refresh() {
    this.empresas = this.api.listEmpresas();
    this.vans = this.api.listVans();
    if (this.selected) {
      const updated = this.api.getEmpresa(this.selected.id);
      if (updated) {
        this.selected = updated;
      } else {
        this.selected = undefined;
        this.isEditing = false;
      }
    }
  }

  selectEmpresa(id: string) {
    this.selected = this.api.getEmpresa(id);
    this.isEditing = false;
  }

  createEmpresa() {
    if (!this.canSubmitNew) return;
    const payload = { ...this.newEmpresa };
    const created = this.api.createEmpresa({
      nome: payload.nome.trim(),
      nomeFantasia: payload.nomeFantasia.trim(),
      cnpj: payload.cnpj.trim(),
      responsavelLegal: payload.responsavelLegal.trim(),
      cpfResponsavel: payload.cpfResponsavel.trim(),
      dataAbertura: this.dateInputToIso(payload.dataAbertura),
      endereco: payload.endereco.trim(),
      telefone: payload.telefone.trim()
    });
    this.newEmpresa = this.createEmptyForm();
    this.refresh();
    this.selectEmpresa(created.id);
  }

  startEdit() {
    if (!this.selected) return;
    this.editEmpresa = {
      nome: this.selected.nome || '',
      nomeFantasia: this.selected.nomeFantasia || '',
      cnpj: this.selected.cnpj || '',
      responsavelLegal: this.selected.responsavelLegal || '',
      cpfResponsavel: this.selected.cpfResponsavel || '',
      dataAbertura: this.isoToDateInput(this.selected.dataAbertura),
      endereco: this.selected.endereco || '',
      telefone: this.selected.telefone || ''
    };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editEmpresa = this.createEmptyForm();
  }

  saveEdit() {
    if (!this.selected || !this.canSaveEdition) return;
    const payload = { ...this.editEmpresa };
    const id = this.selected.id;
    this.api.updateEmpresa(id, {
      nome: payload.nome.trim(),
      nomeFantasia: payload.nomeFantasia.trim(),
      cnpj: payload.cnpj.trim(),
      responsavelLegal: payload.responsavelLegal.trim(),
      cpfResponsavel: payload.cpfResponsavel.trim(),
      dataAbertura: this.dateInputToIso(payload.dataAbertura),
      endereco: payload.endereco.trim(),
      telefone: payload.telefone.trim()
    });
    this.isEditing = false;
    this.editEmpresa = this.createEmptyForm();
    this.refresh();
    this.selected = this.api.getEmpresa(id);
  }

  deleteEmpresa(id: string) {
    if (!confirm('Excluir esta empresa?')) return;
    this.api.deleteEmpresa(id);
    if (this.selected?.id === id) {
      this.selected = undefined;
      this.isEditing = false;
    }
    this.refresh();
  }

  getVanPlaca(vid: string): string {
    return this.vans.find(v => v.id === vid)?.placa || '—';
  }

  getVanModelo(vid: string): string {
    return this.vans.find(v => v.id === vid)?.marcaModelo || '—';
  }

  createEmptyForm(): EmpresaFormData {
    return {
      nome: '',
      nomeFantasia: '',
      cnpj: '',
      responsavelLegal: '',
      cpfResponsavel: '',
      dataAbertura: '',
      endereco: '',
      telefone: ''
    };
  }

  isFilled(value: string): boolean {
    return !!value && value.trim().length > 0;
  }
  
  dateInputToIso(date: string): string {
    const d = new Date(date);
    return d.toISOString();
  }

  isoToDateInput(date?: string): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('pt-BR');
  }
}


