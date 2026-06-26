import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinica } from '../../models/clinica.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private apiUrl = `${environment.apiUrl}/clinicas`;

  constructor(private http: HttpClient) {}

  obterTodas(): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(this.apiUrl);
  }

  obterPorId(id: string): Observable<Clinica> {
    return this.http.get<Clinica>(`${this.apiUrl}/${id}`);
  }

  obterAvaliacoes(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/avaliacoes`);
  }
}