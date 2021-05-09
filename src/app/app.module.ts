import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CrudUserComponent } from './components/crud-user/crud-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponent,
    ListUserComponent,
    CrudUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
