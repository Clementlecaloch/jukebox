import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import * as querystring from 'querystring';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { RoomAdminComponent } from './pages/room-admin/room-admin.component';
import { RoomUserComponent } from './pages/room-user/room-user.component';
import * as configjson from "../assets/config.json";

const config: any = configjson

const client_id = config.client_id; // Your client id
const client_secret = config.client_secret; // Your client secret
const redirect_uri = config.redirectUri; // Your redirect uri
const scope = config.scope; // Your scope

var generateRandomString = function(length: number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

console.log(redirect_uri)


const routes: Routes = [
  {
    path: 'login', component: AccueilComponent, resolve: {
      url: 'externalUrlRedirectResolver'
    },
    data: {
      externalUrl: 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: generateRandomString(16)
        })
    }
  },
  { path: 'accueil', component: AccueilComponent },
  { path: 'room-admin', component: RoomAdminComponent },
  { path: 'room-user', component: RoomUserComponent },
  { path: 'login-page', component: LoginComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ]
})
export class AppRoutingModule { }
