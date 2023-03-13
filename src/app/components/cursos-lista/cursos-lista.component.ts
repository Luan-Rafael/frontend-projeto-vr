import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from '../../services/course.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: []
})
export class CursosListaComponent implements OnInit {
  courseForm: FormGroup;

  courses: any = [];
  visualizarForm: boolean;

  constructor(private crudService: CrudService,
    public formBuilder: FormBuilder, private router: Router,
    private ngZone: NgZone,
  ) {
    this.courseForm = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      ementa: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.buscarDados()

  }

  buscarDados() {
    this.crudService.getCourses().then(res => {
      this.courses = res.data
    });
  }


  delete(id: string, i: number) {
    if (window.confirm('Deseja realmente deletar?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.buscarDados()
      })
    }
  }

  onSubmit(): any {
    const { codigo, descricao, ementa } = this.courseForm.value;

    if (codigo) {
      this.crudService.updateBook(codigo, { descricao, ementa })
        .subscribe(() => {
          this.buscarDados()
          this.visualizarForm = false
        }, (err) => {
          window.alert(err)
        });
    } else {
      this.crudService.addCourse(this.courseForm.value)
        .subscribe(() => {
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

  abrirFormUpdate(course: any) {
    console.log(course)
    this.visualizarForm = true;

    this.courseForm = this.formBuilder.group({
      codigo: [course.codigo],
      descricao: [course.descricao],
      ementa: [course.ementa]
    });

  }
}
