import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PrincipalComponent } from './component/principal/principal.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent}, // Mostrar ProductListComponent al inicio
  { path: 'login', component: LoginComponent },
  { path: 'product-list', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
