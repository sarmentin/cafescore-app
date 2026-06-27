import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AvaliacaoService } from '../../../core/services/avaliacao.service';

@Component({
  selector: 'app-form-avaliacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './form-avaliacao.component.html',
  styleUrl: './form-avaliacao.component.scss'
})
export class FormAvaliacaoComponent implements OnInit {
  form: FormGroup;
  clinicaId = '';
  carregando = false;
  erro = '';
  notaSelecionada = 0;

  constructor(
    private fb: FormBuilder,
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nota: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.clinicaId = this.route.snapshot.paramMap.get('clinicaId')!;
  }

  selecionarNota(nota: number): void {
    this.notaSelecionada = nota;
    this.form.patchValue({ nota });
  }

  submeter(): void {
    if (this.form.invalid) return;

    this.carregando = true;
    this.erro = '';

    this.avaliacaoService.criar({
      clinicaId: this.clinicaId,
      nota: this.form.value.nota,
      comentario: this.form.value.comentario
    }).subscribe({
      next: () => {
        this.snackBar.open('Avaliação salva com sucesso! ☕', 'Fechar', {
          duration: 3000,
          panelClass: ['snack-sucesso']
        });
        this.router.navigate(['/clinicas', this.clinicaId]);
      },
      error: (err) => {
        this.erro = err.error?.mensagem || 'Erro ao salvar avaliação';
        this.carregando = false;
      }
    });
  }
}