import { Component } from '@angular/core';
import { TarefasService } from '../services/tarefas.service';
import { TarefaModel } from './tarefa.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent {
  tarefa: TarefaModel = new TarefaModel();
  tarefas: Array<any> = new Array();
  numTentativas: number = 0;
  selectedTarefa: any;
  isModalOpen: boolean = false;


  constructor(private tarefasService: TarefasService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listarTarefas();
  }

  openModal(tarefa: any) {
    this.selectedTarefa = tarefa;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  remover(id: any) {
    this.tarefasService.removerTarefa(id).subscribe(tarefa => {
      this.tarefa = new TarefaModel();
      this.listarTarefas();
    }, err => {
      this.toastr.error('Erro ao deletar a tarefa');
      console.log('Erro ao deletar a tarefa', err);
    });
  }

  atualizar(id: number) {
    console.log(this.tarefa);

    this.tarefa.status = parseInt(this.tarefa.status, 10);

    this.tarefasService.atualizarTarefa(id, this.tarefa).subscribe(tarefa => {
      this.tarefa = new TarefaModel();
      this.listarTarefas();
    }, err => {
      this.toastr.error('Erro ao atualizar a tarefa');
      console.log('Erro ao atualizar a tarefa', err);
    });
  }

  Cadastrar() {
    console.log(this.tarefa);

    // Convertendo os valores para números inteiros
    this.tarefa.status = parseInt(this.tarefa.status, 10);

    this.tarefasService.cadastrarTarefa(this.tarefa).subscribe(tarefa => {
      this.tarefa = new TarefaModel();
      this.listarTarefas();
    }, err => {
      if (this.numTentativas < 3) {
        this.toastr.error('Erro ao cadastrar a tarefa');
        console.log('Erro ao cadastrar a tarefa', err);
        this.numTentativas++;
      } else {
        this.toastr.error('Erro: Lembrete, O usuarioId tem que estar relacionado a um usuario que exista, confirme para que não seja isso o motivo dos erros!!.');
        console.log('Erro: Lembrete, O usuarioId tem que estar relacionado a um usuario que exista, confirme para que não seja isso o motivo dos erros!!.', err);
      }
    });
  }

  listarTarefas() {
    this.tarefasService.listarTarefas().subscribe(tarefas => {
      this.tarefas = tarefas;
    }, err => {
      this.toastr.error('Erro ao listar as tarefas')
      console.log('Erro ao listar as tarefas', err);
    });
  }
}
