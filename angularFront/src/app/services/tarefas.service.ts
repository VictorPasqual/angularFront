import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TarefaModel } from '../tarefas/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cadastrarTarefa(tarefa: TarefaModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarefa`, tarefa);
  }

  listarTarefas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarefa`);
  }

  atualizarTarefa(id: any, tarefa: TarefaModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/tarefa/${id}`, tarefa);
  }

  removerTarefa(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tarefa/${id}`);
  }
}
