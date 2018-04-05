//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BoardsComponent } from './components/boards/boards.component';

//Servicios
import { BoardService} from './services/board.service';

//Rutas
import { APP_ROUTING } from './app.routes';
import { FormCiudadComponent } from './components/boards/formCiudad.component'
import { FormBoardComponent } from './components/boards/formBoard.component';
import { TestsocketComponent } from './components/testsocket/testsocket.component'



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    BoardsComponent,
    FormCiudadComponent,
    FormBoardComponent,
    TestsocketComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
