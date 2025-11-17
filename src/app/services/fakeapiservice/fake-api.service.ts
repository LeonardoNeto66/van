import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Van } from '../../models/van.model';
import { Empresa } from '../../models/empresa.model';
import { Escola } from '../../models/escola.model';
import { v4 as uuid } from 'uuid'; // <-- ADICIONE ESTA LINHA

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  private STORAGE_KEY = 'vanguarda_demo_v1';

  private state: {
    vans: Van[];
    empresas: Empresa[];
    escolas: Escola[];
  } = { vans: [], empresas: [], escolas: [] };

  constructor() {
    this.load();
    if (this.state.empresas.length === 0 && this.state.vans.length === 0 && this.state.escolas.length === 0) {
      this.seed();
      this.save();
    }
  }

  private seed() {
    const emp1: Empresa = {
      id: uuid(),
      nome: 'Transporte Alfa',
      nomeFantasia: 'Alfa Transportes Escolares',
      cnpj: '12.345.678/0001-90',
      responsavelLegal: 'João Motorista',
      cpfResponsavel: '123.456.789-00',
      dataAbertura: new Date(2018, 6, 4).toISOString(),
      endereco: 'Rua das Vans, 45 - Centro',
      telefone: '(11) 98888-0000',
      responsavel: 'João Motorista',
      solicitante: 'Portal Vanguard',
      createdAt: new Date().toISOString(),
      funcionarios: ['João Motorista','Maria Auxiliar'],
      vans: []
    };

    const van1 = this.createVanObject({
      placa: 'ABC1D23',
      renavam: '12345678901',
      marcaModelo: 'Fiat/Ducato',
      tipo: 'Van',
      especie: 'Passageiros',
      combustivel: 'Diesel',
      anoModelo: 2020,
      anoFabricacao: 2019,
      potencia: 140,
      cilindradas: 2000,
      empresaId: emp1.id
    });

    emp1.vans!.push(van1.id);

    const escola1: Escola = {
      id: uuid(),
      nome: 'Colégio Teste Central',
      endereco: 'Av. dos Testes, 123',
      createdAt: new Date().toISOString()
    };

    this.state.empresas = [emp1];
    this.state.vans = [van1];
    this.state.escolas = [escola1];
  }

  private createVanObject(partial: Partial<Van>): Van {
    return {
      id: uuid(),
      placa: partial.placa || '',
      renavam: partial.renavam || '',
      marcaModelo: partial.marcaModelo || '',
      tipo: partial.tipo || '',
      especie: partial.especie || '',
      combustivel: partial.combustivel || '',
      anoModelo: partial.anoModelo || new Date().getFullYear(),
      anoFabricacao: partial.anoFabricacao || new Date().getFullYear(),
      potencia: partial.potencia || 0,
      cilindradas: partial.cilindradas || 0,
      empresaId: partial.empresaId,
      createdAt: new Date().toISOString()
    };
  }

  private save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
  }

  private load() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      this.state = JSON.parse(raw);
    }
  }

  // Vans
  listVans(): Van[] { return [...this.state.vans]; }

  getVan(id: string): Van | undefined { return this.state.vans.find(v => v.id === id); }

  createVan(data: Partial<Van>): Van {
    const van = this.createVanObject(data);
    this.state.vans.push(van);
    if (van.empresaId) {
      const emp = this.getEmpresa(van.empresaId);
      if (emp) emp.vans = emp.vans || [], emp.vans.push(van.id);
    }
    this.save();
    return van;
  }

  updateVan(id: string, patch: Partial<Van>): Van | undefined {
    const idx = this.state.vans.findIndex(v => v.id === id);
    if (idx === -1) return;
    this.state.vans[idx] = { ...this.state.vans[idx], ...patch };
    this.save();
    return this.state.vans[idx];
  }

  deleteVan(id: string) {
    this.state.vans = this.state.vans.filter(v => v.id !== id);
    this.state.empresas.forEach(e => e.vans = (e.vans || []).filter(vid => vid !== id));
    this.save();
  }

  // Empresas
  listEmpresas(): Empresa[] { return [...this.state.empresas]; }

  getEmpresa(id: string): Empresa | undefined { return this.state.empresas.find(e => e.id === id); }

  createEmpresa(partial: Partial<Empresa>): Empresa {
    const now = new Date().toISOString();
    const empresa: Empresa = {
      id: uuid(),
      nome: partial.nome || 'Nova Empresa',
      nomeFantasia: partial.nomeFantasia,
      cnpj: partial.cnpj,
      responsavelLegal: partial.responsavelLegal ?? partial.responsavel,
      cpfResponsavel: partial.cpfResponsavel,
      dataAbertura: partial.dataAbertura,
      endereco: partial.endereco,
      telefone: partial.telefone,
      responsavel: partial.responsavelLegal ?? partial.responsavel,
      solicitante: partial.solicitante || 'Portal Vanguard',
      createdAt: now,
      funcionarios: partial.funcionarios || [],
      vans: partial.vans || []
    };
    this.state.empresas.push(empresa);
    this.save();
    return empresa;
  }

  updateEmpresa(id: string, patch: Partial<Empresa>) {
    const empresa = this.state.empresas.find(e => e.id === id);
    if (!empresa) return;
    if (patch.nome !== undefined) empresa.nome = patch.nome;
    if (patch.nomeFantasia !== undefined) empresa.nomeFantasia = patch.nomeFantasia;
    if (patch.cnpj !== undefined) empresa.cnpj = patch.cnpj;
    if (patch.responsavelLegal !== undefined) empresa.responsavelLegal = patch.responsavelLegal;
    if (patch.cpfResponsavel !== undefined) empresa.cpfResponsavel = patch.cpfResponsavel;
    if (patch.dataAbertura !== undefined) empresa.dataAbertura = patch.dataAbertura;
    if (patch.endereco !== undefined) empresa.endereco = patch.endereco;
    if (patch.telefone !== undefined) empresa.telefone = patch.telefone;
    if (patch.responsavel !== undefined || patch.responsavelLegal !== undefined) {
      empresa.responsavel = patch.responsavelLegal ?? patch.responsavel ?? empresa.responsavel;
    }
    if (patch.funcionarios !== undefined) empresa.funcionarios = [...patch.funcionarios];
    if (patch.vans !== undefined) empresa.vans = [...patch.vans];
    if (patch.solicitante !== undefined) empresa.solicitante = patch.solicitante;
    this.save();
    return empresa;
  }

  deleteEmpresa(id: string) {
    // when deleting an empresa, also unlink or delete vans (business choice: delete vans)
    const empresa = this.getEmpresa(id);
    if (empresa) {
      const vansToDelete = empresa.vans || [];
      this.state.vans = this.state.vans.filter(v => !vansToDelete.includes(v.id));
    }
    this.state.empresas = this.state.empresas.filter(e => e.id !== id);
    this.save();
  }

  // Escolas
  listEscolas(): Escola[] { return [...this.state.escolas]; }

  getEscola(id: string): Escola | undefined { return this.state.escolas.find(s => s.id === id); }

  createEscola(payload: Partial<Escola>): Escola {
    const s: Escola = {
      id: uuid(),
      nome: payload.nome || 'Escola',
      endereco: payload.endereco || '',
      createdAt: new Date().toISOString()
    };
    this.state.escolas.push(s);
    this.save();
    return s;
  }

  updateEscola(id: string, patch: Partial<Escola>) {
    const idx = this.state.escolas.findIndex(s => s.id === id);
    if (idx === -1) return;
    this.state.escolas[idx] = { ...this.state.escolas[idx], ...patch };
    this.save();
    return this.state.escolas[idx];
  }

  deleteEscola(id: string) {
    this.state.escolas = this.state.escolas.filter(s => s.id !== id);
    this.save();
  }
}
