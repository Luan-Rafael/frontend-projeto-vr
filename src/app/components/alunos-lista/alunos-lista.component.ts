import { Usuario } from '../../models/Usuario';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AlunosService } from '../../services/alunos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: []
})
export class AlunosListaComponent implements OnInit {
  users: any = [];
  userForm: FormGroup;
  visualizarForm: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private alunosService: AlunosService) {
    this.userForm = this.formBuilder.group({
      nome: [''],
    });
  }

  ngOnInit(): void {
    this.buscarDados()
  }

  async buscarDados() {
    this.alunosService.retornaAlunos().then(res => {
      this.users = res.data
    });
  }


  onSubmit(): any {
    const { codigo, nome } = this.userForm.value;

    if (codigo) {
      this.alunosService.atualizaAluno(codigo, { nome })
        .subscribe(() => {
          this.buscarDados()
          this.visualizarForm = false

        }, (err) => {
          console.log(err);
        });
    } else {
      this.alunosService.adicionaAluno(this.userForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.buscarDados()
          this.visualizarForm = false

        }, (err) => {
          console.log(err);
        });
    }
  }

  abrirForm() {
    this.visualizarForm = true;
  }
  abrirFormUpdate(user: Usuario) {
    console.log(user)
    this.visualizarForm = true;

    this.userForm = this.formBuilder.group({
      codigo: [user.codigo],
      nome: [user.nome],
    });

  }


  delete(id: string, i: number) {
    console.log(id);
    if (window.confirm('Deseja realmente deletar?')) {
      this.alunosService.deletaAluno(id).subscribe((res) => {
        this.buscarDados()

      })
    }
  }
}