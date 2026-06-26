import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginDto {
  email: string;
  senha: string;
}

export interface RegistrarDto {
  nome: string;
  email: string;
  senha: string;
}

export interface TokenDto {
  token: string;
  nome: string;
  email: string;
  expiracao: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  registrar(dto: RegistrarDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.apiUrl}/registrar`, dto).pipe(
      tap(res => this.salvarToken(res))
    );
  }

  login(dto: LoginDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => this.salvarToken(res))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  isLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): { nome: string; email: string } | null {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  private salvarToken(res: TokenDto): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('usuario', JSON.stringify({ nome: res.nome, email: res.email }));
  }
}