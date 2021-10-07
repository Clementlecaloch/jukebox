import { Component, Input, OnInit } from '@angular/core';
import { LocalCookieService } from 'src/app/services/cookie.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-file-attente',
  templateUrl: './file-attente.component.html',
  styleUrls: ['./file-attente.component.scss']
})
export class FileAttenteComponent implements OnInit {

  @Input() playlistSelected: any

  @Input() admin: boolean = true

  constructor(
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    
  }

  remove(pos: number) {
    this.socketService.send('removeSong', pos)
  }

}
