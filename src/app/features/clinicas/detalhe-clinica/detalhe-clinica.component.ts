import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { ClinicaService } from '../../../core/services/clinica.service';
import { AuthService } from '../../../core/services/auth.service';
import { Clinica } from '../../../models/clinica.model';
import { Avaliacao } from '../../../models/avaliacao.model';

@Component({
  selector: 'app-detalhe-clinica',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './detalhe-clinica.component.html',
  styleUrl: './detalhe-clinica.component.scss'
})
export class DetalheClinicaComponent implements OnInit {
  clinica: Clinica | null = null;
  avaliacoes: Avaliacao[] = [];
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private clinicaService: ClinicaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.clinicaService.obterPorId(id).subscribe({
      next: (clinica) => {
        this.clinica = clinica;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Clínica não encontrada';
        this.carregando = false;
      }
    });

    this.clinicaService.obterAvaliacoes(id).subscribe({
      next: (avaliacoes) => this.avaliacoes = avaliacoes
    });
  }

  get isLogado(): boolean {
    return this.authService.isLogado();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  avaliar(): void {
    this.router.navigate(['/avaliacoes/nova', this.clinica!.id]);
  }

  estrelas(nota: number): number[] {
    return Array(Math.round(nota)).fill(0);
  }

  estrelasVazias(nota: number): number[] {
    return Array(5 - Math.round(nota)).fill(0);
  }
}