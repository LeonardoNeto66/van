import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../services/fakeapiservice/fake-api.service'; // Caminho corrigido
import { Escola } from '../models/escola.model'; // Caminho corrigido
// 1. Importe CommonModule e FormsModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-escolas-gerenciar',
  standalone: true, // 2. Adicione
  imports: [CommonModule, FormsModule], // 3. Adicione
  templateUrl: './escolas-gerenciar.component.html',
  styleUrls: ['./escolas-gerenciar.component.css']
})
export class EscolasGerenciarComponent implements OnInit {
  escolas: Escola[] = [];
  editing?: Escola;
  newNome = '';
  newEndereco = '';

  constructor(private api: FakeApiService) {}

  ngOnInit() { this.refresh(); }

  refresh() { this.escolas = this.api.listEscolas(); }

  createEscola() {
    if (!this.newNome.trim()) return;
    this.api.createEscola({ nome: this.newNome, endereco: this.newEndereco });
    this.newNome = this.newEndereco = '';
    this.refresh();
  }

  edit(escola: Escola) {
    this.editing = { ...escola };
  }

  saveEdit() {
    if (!this.editing) return;
    this.api.updateEscola(this.editing.id, { nome: this.editing.nome, endereco: this.editing.endereco });
    this.editing = undefined;
    this.refresh();
  }

  deleteEscola(id: string) {
    if (!confirm('Excluir escola?')) return;
    this.api.deleteEscola(id);
    this.refresh();
  }
}
