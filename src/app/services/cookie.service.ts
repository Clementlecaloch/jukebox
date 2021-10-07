import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { CookieData } from "../models/modelsForData/cookies.model";


@Injectable({
  providedIn: 'root',
})
export class LocalCookieService {
  
  public cookie: CookieData = {
    TOKEN: '',
    REFRESH_TOKEN: '',
  }

  constructor(private cookieService: CookieService
  ) {

  }

  setAccessToken(token: string) {
    this.cookie.TOKEN = token;
    this.cookieService.set("access_token", this.cookie.TOKEN)
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token')
  }
  
  setRefreshToken(refresh_token: any) {
    this.cookie.REFRESH_TOKEN = refresh_token;
    this.cookieService.set("refresh_token", this.cookie.REFRESH_TOKEN)
  }

  getRefreshToken(): string {
    return this.cookieService.get('refresh_token')
  }


  getPseudo() {
    return this.cookieService.get('pseudo')
  }


  getCookies() {
    console.log(this.cookieService.getAll())
  }
}