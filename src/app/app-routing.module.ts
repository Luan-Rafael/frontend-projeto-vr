import { MatriculasListaComponent } from './components/matriculas-lista/matriculas-lista.component';
import { AlunosListaComponent } from './components/alunos-lista/alunos-lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosListaComponent } from './components/cursos-lista/cursos-lista.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos-lista' },
  { path: 'cursos-lista', component: CursosListaComponent },
  { path: 'usuarios-lista', component: AlunosListaComponent },
  { path: 'matricula-lista', component: MatriculasListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
