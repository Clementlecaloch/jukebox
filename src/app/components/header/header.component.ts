import { Component, OnInit } from '@angular/core';
import { LocalCookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public cookieService: LocalCookieService) { }

  ngOnInit(): void {
  }

}
