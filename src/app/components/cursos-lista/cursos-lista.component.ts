import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Validators } from '@angular/forms';
import { Curso } from 'src/app/models/Curso';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: []
})
export class CursosListaComponent implements OnInit {

  formulario: FormGroup;
  cursos: Curso[];
  visualizarFormulario: boolean;

  constructor(private cursosService: CursosService,
    public formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      ementa: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.buscarDados();
  }

  buscarDados() {
    this.cursosService.retornaCursos().then(res => {
      this.cursos = res.data
    });
  }


  delete(id: string, i: number) {
    if (window.confirm('Deseja realmente deletar?')) {
      this.cursosService.deletaCurso(id).subscribe((res) => {
        this.buscarDados()
      })
    }
  }

  onSubmit(): any {
    const { codigo, descricao, ementa } = this.formulario.value;

    if (codigo) {
      this.cursosService.atualizaCurso(codigo, { descricao, ementa })
        .subscribe(() => {
          this.buscarDados()
          this.visualizarFormulario = false
        }, (err) => {
          window.alert(err)
        });
    } else {
      this.cursosService.adicionaCurso(this.formulario.value)
        .subscribe(() => {
          this.buscarDados()
          this.visualizarFormulario = false
        }, (err) => {
          console.log(err);
        });
    }


  }

  abrirForm() {
    this.formulario = this.formBuilder.group({
      descricao: [''],
      ementa: ['']
    });
    this.visualizarFormulario = true;
  }

  fecharForm() {
    this.visualizarFormulario = false;

    this.formulario = this.formBuilder.group({
      descricao: [''],
      ementa: ['']
    });
  }

  abrirFormUpdate(course: any) {
    console.log(course)
    this.visualizarFormulario = true;

    this.formulario = this.formBuilder.group({
      codigo: [course.codigo],
      descricao: [course.descricao],
      ementa: [course.ementa]
    });

  }
}
