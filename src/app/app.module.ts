import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { CreatepersonComponent } from './createperson/createperson.component';
import { ServicoService } from './homepage/servico.service';
import { UpdatepersonComponent } from './updateperson/updateperson.component';
import { DeletepersonComponent } from './deleteperson/deleteperson.component';
import { ReadpersonComponent } from './readperson/readperson.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    CreatepersonComponent,
    UpdatepersonComponent,
    DeletepersonComponent,
    ReadpersonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TextMaskModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomepageComponent, pathMatch: 'full' },
      { path: 'app-createperson', component: CreatepersonComponent },
      { path: 'app-updateperson/:id', component: UpdatepersonComponent },
      { path: 'app-deleteperson/:id', component: DeletepersonComponent },
      { path: 'app-readperson/:id', component: ReadpersonComponent }

    ])
  ],
  providers: [ServicoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
