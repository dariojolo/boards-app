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
import { FormComponent } from './components/boards/form.component'



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    InicioComponent,
    BoardsComponent,
    FormComponent
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
