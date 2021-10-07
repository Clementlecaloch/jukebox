import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LocalCookieService } from 'src/app/services/cookie.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-room-user',
  templateUrl: './room-user.component.html',
  styleUrls: ['./room-user.component.scss']
})
export class RoomUserComponent implements OnInit {
  musiqueOfPlaylist: any = []

  favoriteColorControl = new FormControl('');



  constructor(
    private socketService: SocketService,
    private userCourantService: UserService,
    private formBuilder: FormBuilder,
    public cookieService: LocalCookieService,
    ) { }

  ngOnInit(): void {
    this.socketService.initUserExterne()

    this.socketService.getPlaylistSubscriber.subscribe((playlist) => {
      this.musiqueOfPlaylist =  playlist
    })
    
    this.socketService.send("getPlaylist")
  }
}
