import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClinicaService } from '../../../core/services/clinica.service';
import { AuthService } from '../../../core/services/auth.service';
import { Clinica } from '../../../models/clinica.model';

@Component({
  selector: 'app-lista-clinicas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './lista-clinicas.component.html',
  styleUrl: './lista-clinicas.component.scss'
})
export class ListaClinicasComponent implements OnInit {
  clinicas: Clinica[] = [];
  carregando = true;
  erro = '';

  constructor(
    private clinicaService: ClinicaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clinicaService.obterTodas().subscribe({
      next: (clinicas) => {
        this.clinicas = clinicas;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar clínicas';
        this.carregando = false;
      }
    });
  }

  verDetalhe(id: string): void {
    this.router.navigate(['/clinicas', id]);
  }

  get isLogado(): boolean {
    return this.authService.isLogado();
  }

  get usuario() {
    return this.authService.getUsuario();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  estrelas(nota: number): number[] {
    return Array(Math.round(nota)).fill(0);
  }

  estrelasVazias(nota: number): number[] {
    return Array(5 - Math.round(nota)).fill(0);
  }
}