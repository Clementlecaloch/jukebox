import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ClcApiService } from "../models/clc-api/services/clc-api.service";
import { SpotifyClass } from "../models/modelsForServices/spotify.model";
import { LocalCookieService } from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService extends SpotifyClass {

  user: any;
  access_token: string = '';
  public isInit: boolean = false;
  refresh_token: any;

  constructor(
    http: HttpClient,
    private cookieService: LocalCookieService
  ) {
    super(http)
  }

  async login(code: string) {
    return new Promise((resolve, reject) => {
      this.connectSpotify(code).then((value: any) => {
        this.user = value.body;
        this.setCookies(value);
        this.isInit = true
        resolve(true)
      })
    })
  }


  private setCookies(value: any) {
    this.access_token = value.access_token;
    this.refresh_token = value.refresh_token;
    this.cookieService.setAccessToken(this.access_token);
    this.cookieService.setRefreshToken(this.refresh_token);
  }

  async refreshToken(code: string) {
    return new Promise((resolve, reject) => {
      this.refreshTokenAPI(code).then((data: any) => {
        this.access_token = data.access_token;
        this.cookieService.setAccessToken(this.access_token);
        this.user = data.body
        resolve(true)
      })
    })
  }

  getUserPlaylists() {
    return this.getUserPlaylist(this.access_token)
  }

  search(value: string): Promise<any> {
    return this.searchWithValue(value, this.cookieService.getAccessToken())
  }
}