import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './pages/login/login.component';
import { RoomAdminComponent } from './pages/room-admin/room-admin.component';
import { RoomUserComponent } from './pages/room-user/room-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileAttenteComponent } from './components/file-attente/file-attente.component';
import {MatDividerModule} from '@angular/material/divider';
import { PlaylistDataComponent } from './components/playlist-data/playlist-data.component';
import { HeaderComponent } from './components/header/header.component';
import { BoutonPlayComponent } from './components/bouton-play/bouton-play.component';
import { SearchInputComponent } from './components/search-input/search-input.component'
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PlaybackComponent } from './components/playback/playback.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RoomAdminComponent,
    RoomUserComponent,
    FileAttenteComponent,
    PlaylistDataComponent,
    HeaderComponent,
    BoutonPlayComponent,
    SearchInputComponent,
    PlaybackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
  ],
  providers: [
    [CookieService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
