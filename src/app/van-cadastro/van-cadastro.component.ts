import { Component, OnInit } from '@angular/core';
// 1. Importe CommonModule e ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FakeApiService } from '../services/fakeapiservice/fake-api.service';
import { Van } from '../models/van.model';
import { Empresa } from '../models/empresa.model';

@Component({
  selector: 'app-van-cadastro',
  standalone: true, // 2. Adicione
  imports: [CommonModule, ReactiveFormsModule], // 3. Adicione
  templateUrl: './van-cadastro.component.html',
  styleUrls: ['./van-cadastro.component.css']
})
export class VanCadastroComponent implements OnInit {
  vanForm!: FormGroup;
  empresas: Empresa[] = [];
  vans: Van[] = [];
  savedMsg = '';

  constructor(private fb: FormBuilder, private api: FakeApiService) {}

  ngOnInit() {
    this.empresas = this.api.listEmpresas();
    this.vans = this.api.listVans();
    this.vanForm = this.fb.group({
      placa: ['', [Validators.required, Validators.minLength(6)]],
      renavam: ['', Validators.required],
      marcaModelo: ['', Validators.required],
      tipo: ['', Validators.required],
      especie: ['', Validators.required],
      combustivel: ['', Validators.required],
      anoModelo: [new Date().getFullYear(), [Validators.required]],
      anoFabricacao: [new Date().getFullYear(), [Validators.required]],
      potencia: [0, [Validators.required, Validators.min(1)]],
      cilindradas: [0, [Validators.required, Validators.min(1)]],
      empresaId: ['']
    });
  }

  onSubmit() {
    if (this.vanForm.invalid) return;
    const van = this.api.createVan(this.vanForm.value);
    this.savedMsg = 'Van cadastrada com sucesso!';
    this.vans = this.api.listVans();
    this.vanForm.reset({
      anoModelo: new Date().getFullYear(),
      anoFabricacao: new Date().getFullYear()
    });
    setTimeout(() => {
      const el = document.getElementById('lastCreatedVanId');
      if (el) el.textContent = van.id;
    }, 50);
  }

  removeVan(id: string) {
    if (!confirm('Confirmar remoção da van?')) return;
    this.api.deleteVan(id);
    this.vans = this.api.listVans();
  }
}
