import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioModel } from '../usuarios/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: UsuarioModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, usuario);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  atualizarUsuario(id: any, usuario: UsuarioModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${id}`, usuario);
  }

  removerUsuario(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }
}
