import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from '../../services/course.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  courseForm: FormGroup;

  courses: any = [];
  visualizarForm: boolean;

  constructor(private crudService: CrudService,
    public formBuilder: FormBuilder, private router: Router,
    private ngZone: NgZone,
  ) {
    this.courseForm = this.formBuilder.group({
      descricao: [''],
      ementa: ['']
    });
  }
  ngOnInit(): void {
    this.buscarDados()

  }

  buscarDados() {
    this.crudService.getCourses().then(res => {
      console.log(res)
      this.courses = res.data
    });
  }


  delete(id: string, i: number) {
    console.log(id);
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
          console.log('Data added successfully!')
          this.buscarDados()
          this.visualizarForm = false

        }, (err) => {
          console.log(err);
        });
    } else {
      this.crudService.addCourse(this.courseForm.value)
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
