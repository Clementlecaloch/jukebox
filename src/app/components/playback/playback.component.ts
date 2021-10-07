import { Component, Input, OnInit } from '@angular/core';
import { stat } from 'fs';
import { LocalCookieService } from 'src/app/services/cookie.service';
import { SocketService } from 'src/app/services/socket.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {

  device_id: string;

  current_track: any;
  musiqueOfPlaylist: any;
  player: Spotify.Player;
  playbackStore: any;
  playing: boolean = false;
  currentPlayedSong: any;
  previousState: any = null;

  constructor(
    private cookieService: LocalCookieService,
    private socketService: SocketService,
  ) { }


  ngOnInit(): void {
    this.socketService.getPlaylistSubscriber.subscribe((playlist) => {
      if (playlist.length > 0) {
        this.musiqueOfPlaylist = playlist
        this.current_track = this.musiqueOfPlaylist[0].track
      }
    })
    
    this.initPlaybackSDK(this.cookieService.getAccessToken(), 0.5)
    setTimeout(() => this.playSong(), 2000)
  }

  private async initPlaybackSDK(token: string, volume: number) {
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
    this.player = new Player({
      name: 'BDE LES BG',
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume
    });
    
    this.player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    
    this.player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });
    
    this.player.addListener('account_error', ({ message }) => {
      alert(`You account has to have Spotify Premium for playing music ${message}`);
    });
    
    this.player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });
    
    this.player.addListener('player_state_changed', async (state: Spotify.PlaybackState) => {
      if (!state) {
        console.info('[Angular Spotify] No player info!');
        return;
      }
      if (state.paused && state.position == 0 &&
        (this.previousState == null || this.previousState.track_window.current_track.uri != state.track_window.current_track.uri)) {
        this.playSong();
        this.previousState = state
      }
    });
    
    this.player.addListener('ready', ({ device_id }) => {
      this.device_id = device_id;
      console.log('[Angular Spotify] Ready with Device ID', device_id);
    });
    
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('[Angular Spotify] Device ID has gone offline', device_id);
    });
    
    await this.player.connect();
  }

  private playSong() {
    const play = ({
      spotify_uri, playerInstance: {
        _options: {
          getOAuthToken
        }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device_id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
        });
      });
    };
    play({
      playerInstance: this.player,
      spotify_uri: this.current_track.uri
    });
    this.playing = true;
    this.currentPlayedSong = this.current_track

    this.socketService.send("remove")
  }

  private waitForSpotifyWebPlaybackSDKToLoad(): Promise<typeof Spotify> {
    window.onSpotifyWebPlaybackSDKReady = () => {};
    
    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  }

  togglePlay() {
    if (this.playing) {
      this.player.pause()
      this.playing = false;
    } else {
      this.player.resume()
      this.playing = true;
    }
  }

  next() {
    this.playSong()
  }

  
}
