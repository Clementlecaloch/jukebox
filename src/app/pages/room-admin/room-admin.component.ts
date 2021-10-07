import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalCookieService } from 'src/app/services/cookie.service';
import { SocketService } from 'src/app/services/socket.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-room-admin',
  templateUrl: './room-admin.component.html',
  styleUrls: ['./room-admin.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('*', style({
        opacity: 1,
      })),
      transition(':enter', [
        animate('0.25s', style({ top: '30%', opacity: 1}))
      ]),
      transition(':leave', [
        animate('0.25s', style({ top: '60%', opacity: 0}))
      ]),
    ]),
  ],
})
export class RoomAdminComponent implements OnInit {
  
  playlists : any = null;
  
  playlistSelected: any;
  
  musiqueOfPlaylist: any = []
  
  isHovered: boolean = false;


  constructor(
    private spotify: SpotifyService,
    private route: ActivatedRoute,
    public cookieService: LocalCookieService,
    private socketService: SocketService
    ) { }
    
    ngOnInit(): void {
      this.route.queryParams
      .subscribe(async params => {
        if (params.code) {
          if (this.cookieService.getRefreshToken()) {
            await this.spotify.refreshToken(this.cookieService.getRefreshToken())
            this.socketService.init()
          } else {
            await this.spotify.login(params.code)
            this.socketService.init()
          }
          this.setDatas()
        }
      });

      this.socketService.getPlaylistSubscriber.subscribe((playlist) => {
        this.musiqueOfPlaylist.items = playlist
      })
    }
    
    async setDatas() {
      // this.initPlaybackSDK(this.spotify.access_token, 0.8)
      this.playlists = await this.spotify.getUserPlaylists()
    }
    
    async openPlaylist(playlist: any) {
      this.playlistSelected = playlist
      
      this.musiqueOfPlaylist = await this.spotify.getDataByUrl(this.playlistSelected.tracks.href, this.cookieService.getAccessToken())
      this.socketService.send("addPlaylist", { PLAYLIST: this.musiqueOfPlaylist.items })
    }
}
  