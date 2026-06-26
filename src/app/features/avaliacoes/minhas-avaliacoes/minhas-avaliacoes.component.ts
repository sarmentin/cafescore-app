import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { AvaliacaoService } from '../../../core/services/avaliacao.service';
import { Avaliacao } from '../../../models/avaliacao.model';

@Component({
  selector: 'app-minhas-avaliacoes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrl: './minhas-avaliacoes.component.scss'
})
export class MinhasAvaliacoesComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  carregando = true;
  erro = '';

  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarAvaliacoes();
  }

  carregarAvaliacoes(): void {
    this.avaliacaoService.obterMinhas().subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar avaliações';
        this.carregando = false;
      }
    });
  }

  remover(id: string): void {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    this.avaliacaoService.remover(id).subscribe({
      next: () => {
        this.avaliacoes = this.avaliacoes.filter(a => a.id !== id);
      },
      error: () => {
        this.erro = 'Erro ao excluir avaliação';
      }
    });
  }

  estrelas(nota: number): number[] {
    return Array(Math.round(nota)).fill(0);
  }

  estrelasVazias(nota: number): number[] {
    return Array(5 - Math.round(nota)).fill(0);
  }
}