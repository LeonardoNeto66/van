import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../../services/fake-api.service';
import { Empresa } from '../../models/empresa.model';
import { Van } from '../../models/van.model';

@Component({
  selector: 'app-empresas-gerenciar',
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
