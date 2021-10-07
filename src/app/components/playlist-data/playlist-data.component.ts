import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import analyze from 'rgbaster'

@Component({
  selector: 'app-playlist-data',
  templateUrl: './playlist-data.component.html',
  styleUrls: ['./playlist-data.component.scss']
})
export class PlaylistDataComponent implements OnInit {
  
  @Input() playlistSelected: any
  @Output() unselectPlaylist: EventEmitter<any> = new EventEmitter();
  backgroundColor: string;
  
  constructor() { }
  
  async ngOnInit(): Promise<void> {
    if (this.playlistSelected.images[1]) {
      const result = await analyze(this.playlistSelected.images[1].url) // also supports base64 encoded image strings
      const colorarray = result[500].color.replace(')', '').split('(')[1].split(',')
      this.backgroundColor = `linear-gradient(${result[500].color} 0%, ${result[500].color} 70%, #333 100%);`
      console.log(this.backgroundColor)
    }
  }

  randomNextColor(array: string[]) {
    const max = 10
    const r = (array[0] as unknown as number + Math.floor(Math.random() * max)) % 255;
    const g = (array[1] as unknown as number + Math.floor(Math.random() * max)) % 255;
    const b = (array[2] as unknown as number + Math.floor(Math.random() * max)) % 255;

    return `rgb(${r}, ${g},${b})`
  }

  return() {
    this.unselectPlaylist.emit(true)
  }
}
