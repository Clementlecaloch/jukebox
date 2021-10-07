import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  async ngOnInit() {
    
  }

  createRoom() {
    this.router.navigate(['../login-page'])
  }

  joinRoom() {
    this.router.navigate(['../room-user'])
  }
}
