import { Matricula } from './../../models/Matricula';
import { CrudService } from './../../services/course.service';
import { MatriculaService } from './../../services/matricula.service';
import { User } from '../../models/User';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matricula-list',
  templateUrl: './matricula-list.component.html',
  styleUrls: ['./matricula-list.component.scss']
})
export class MatriculaListComponent implements OnInit {
  users: any = [];
  courses: any = [];
  matriculas: any = []
  matriculaForm: FormGroup;
  visualizarForm: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UsersService,
    private courseService: CrudService,
    private matriculaService: MatriculaService,
  ) {
    this.matriculaForm = this.formBuilder.group({
      codigo_aluno: [''],
      codigo_curso: ['']
    });
  }

  ngOnInit(): void {
    this.buscarDados();
    this.obtemUsuario()
  }

  async buscarDados() {
    this.matriculaService.getMatriculas().then(res => {
      this.matriculas = res.data
    });


  }

  async obtemUsuario() {
    const { data } = await this.userService.getUsers()
    this.users = data

    const res = await this.courseService.getCourses()
    this.courses = res.data

    console.log(res.data
    )
  }

  onSubmit(): any {
    const { codigo, codigo_aluno, codigo_curso } = this.matriculaForm.value;

    if (codigo) {
      this.matriculaService.updateMatricula(codigo, { codigo_aluno, codigo_curso })
        .subscribe(() => {
          console.log('Data added successfully!')
          this.buscarDados()
          this.visualizarForm = false
          this.matriculaForm = this.formBuilder.group({
            codigo_aluno: [''],
            codigo_curso: ['']

          });
        }, (err) => {
          console.log(err);
        });
    } else {
      this.matriculaService.addMatricula(this.matriculaForm.value)
        .subscribe(() => {
          console.log('Data added successfully!')
          this.buscarDados()
          this.visualizarForm = false
          this.matriculaForm = this.formBuilder.group({
            codigo_aluno: [''],
            codigo_curso: ['']
          });
        }, (err) => {
          console.log(err);
        });
    }
  }

  abrirForm() {
    this.visualizarForm = true;
  }

  abrirFormUpdate(matricula: Matricula) {
    this.visualizarForm = true;
    this.matriculaForm = this.formBuilder.group({
      codigo: [matricula.codigo],
      codigo_aluno: [matricula.codigo_aluno],
      codigo_curso: [matricula.codigo_curso]
    });

  }

  delete(id: string,) {
    console.log(id);
    if (window.confirm('Deseja realmente deletar?')) {
      this.matriculaService.deleteMatricula(id).subscribe((res) => {
        this.buscarDados();

        this.matriculaForm = this.formBuilder.group({
          codigo_aluno: [''],
          codigo_curso: ['']
        });
      })
    }
  }
}
