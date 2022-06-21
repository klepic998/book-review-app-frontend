import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'book', redirectTo: 'book/index', pathMatch: 'full'},
  { path: 'book/index', component: IndexComponent},
  { path: 'book/:bookId/view', component: ViewComponent},
  { path: 'book/create', component: CreateComponent },
  { path: 'book/:bookId/edit', component: EditComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
