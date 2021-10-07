import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  titreResearch = new FormControl('');
  options: any[] = [];

  constructor(private spotify: SpotifyService, private socket: SocketService) { }

  ngOnInit(): void {
    this.titreResearch.valueChanges.subscribe(async (value) => {
      if (value != '') {
        const res = await this.spotify.search(value)
        this.options = res.tracks.items
      }
    })
  }

  selectMusic(track: any) {
    this.socket.send("addSong", track)
  }



}
