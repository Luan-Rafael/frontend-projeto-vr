import { Matricula } from '../../models/Matricula';
import { CursosService } from '../../services/cursos.service';
import { MatriculaService } from '../../services/matriculas.service';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AlunosService } from '../../services/alunos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'matricula-lista',
  templateUrl: './matriculas-lista.component.html',
  styleUrls: ['./matriculas-lista.component.scss']
})
export class MatriculasListaComponent implements OnInit {
  users: any = [];
  courses: any = [];
  matriculas: any = []
  matriculaForm: FormGroup;
  visualizarForm: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private alunosService: AlunosService,
    private courseService: CursosService,
    private matriculaService: MatriculaService,
  ) {
    this.matriculaForm = this.formBuilder.group({
      codigo_aluno: [''],
      codigo_curso: ['']
    });
  }

  ngOnInit(): void {
    this.buscarDados();
    this.obtemAlunosCursos()
  }

  async buscarDados() {
    this.matriculaService.retornaMatriculas().then(res => {
      this.matriculas = res.data
    });


  }

  async obtemAlunosCursos() {
    const { data } = await this.alunosService.retornaAlunos()
    this.users = data

    const res = await this.courseService.retornaCursos()
    this.courses = res.data

    console.log(res.data
    )
  }

  onSubmit(): any {
    const { codigo, codigo_aluno, codigo_curso } = this.matriculaForm.value;

    if (codigo) {
      this.matriculaService.atualizaMatriculas(codigo, { codigo_aluno, codigo_curso })
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
      this.matriculaService.adicionaMatricula(this.matriculaForm.value)
        .subscribe(() => {
          this.buscarDados()
          this.visualizarForm = false
          this.matriculaForm = this.formBuilder.group({
            codigo_aluno: [''],
            codigo_curso: ['']
          });
        }, (err) => {
          alert('Ocorreu um erro na aplicação')
        });
    }
  }

  abrirForm() {
    this.matriculaForm = this.formBuilder.group({
      codigo_aluno: [''],
      codigo_curso: ['']
    });
    this.visualizarForm = true;
  }

  fecharForm() {
    this.matriculaForm = this.formBuilder.group({
      codigo_aluno: [''],
      codigo_curso: ['']
    });
    this.visualizarForm = false;
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
      this.matriculaService.deletaMatricula(id).subscribe((res) => {
        this.buscarDados();

        this.matriculaForm = this.formBuilder.group({
          codigo_aluno: [''],
          codigo_curso: ['']
        });
      })
    }
  }
}
