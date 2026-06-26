import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avaliacao, CriarAvaliacao, AtualizarAvaliacao } from '../../models/avaliacao.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private apiUrl = `${environment.apiUrl}/avaliacoes`;

  constructor(private http: HttpClient) {}

  obterMinhas(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}/minhas`);
  }

  criar(dto: CriarAvaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, dto);
  }

  atualizar(id: string, dto: AtualizarAvaliacao): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}