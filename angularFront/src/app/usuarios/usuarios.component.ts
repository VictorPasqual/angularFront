import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { UsuarioModel } from './usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuario: UsuarioModel = new UsuarioModel();
  usuarios: Array<any> = new Array();

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  remover(id: any) {
    this.usuariosService.removerUsuario(id).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios();
    }, err => {
      console.log('Erro ao deletar o aluno', err)
    })
  }

  atualizar(id: number) {
    console.log(this.usuario);
    this.usuariosService.atualizarUsuario(id, this.usuario).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios()
    }, err => {
      console.log('Erro ao atualizar o usuario', err)
    })
  }

  Cadastrar() {
    console.log(this.usuario);
    this.usuariosService.cadastrarUsuario(this.usuario).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios()
    }, err => {
      console.log('Erro ao cadastrar o usuario', err)
    })
  }

  listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    }, err => {
      console.log('Erro ao listar os usuarios', err);
    })
  }
}
