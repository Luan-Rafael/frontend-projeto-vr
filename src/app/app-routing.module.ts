import { MatriculaListComponent } from './components/matriculas-list/matricula-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cursos-lista' },
  { path: 'cursos-lista', component: BooksListComponent },
  { path: 'usuarios-lista', component: UsersListComponent },
  { path: 'matricula-lista', component: MatriculaListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
