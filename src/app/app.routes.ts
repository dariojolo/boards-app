import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { BoardsComponent } from './components/boards/boards.component';
import { FormCiudadComponent } from './components/boards/formCiudad.component';
import { FormBoardComponent } from './components/boards/formBoard.component';


const APP_ROUTES: Routes = [ /*Aca vamos agregando las rutas a los components */
  { path: 'inicio', component: InicioComponent },
  { path: 'boards/:usuario', component: BoardsComponent},
  { path: 'board/formCiudad', component: FormCiudadComponent},
  { path: 'board/formCiudad/:id', component: FormCiudadComponent},
  { path: 'board/formBoard', component: FormBoardComponent},
  { path: 'board/formBoard/:id', component: FormBoardComponent},
  { path: '**', pathMatch: 'full',redirectTo:'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
