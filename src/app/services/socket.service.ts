import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Subject } from "rxjs";
import { LocalCookieService } from "./cookie.service";
import { SpotifyService } from "./spotify.service";
import * as config from "../../assets/config.json";


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public getPlaylistSubscriber: Subject<any> = new Subject();
  private config: any = config
  constructor(
    private socket: Socket,
    private cookieService: LocalCookieService,
    private spotify: SpotifyService,
  ) {
    
  }

  public init() {
    console.log(config)
    this.socket = new Socket({
      url: this.config.urlSocket
    });
    this.send("newRoom", { user: this.spotify.user, access_token: this.cookieService.getAccessToken() })
    this.socket.on("sendPlaylistBack", (playlist) => {
      console.log("playlist back")
      this.getPlaylistSubscriber.next(playlist)
    })
  }

  initUserExterne() {
    this.socket = new Socket({
      url: this.config.urlSocket
    });
    this.send("newUser")
    this.socket.on("getAccessToken", (access_token) => {
      this.cookieService.setAccessToken(access_token)
    })
    this.socket.on("sendPlaylistBack", (playlist) => {
      this.getPlaylistSubscriber.next(playlist)
    })
  }

  public send(route: string, data?: any) {
    this.socket.emit(route, data)
  }
  
}