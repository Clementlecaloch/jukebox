import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bouton-play',
  templateUrl: './bouton-play.component.html',
  styleUrls: ['./bouton-play.component.scss'],
})
export class BoutonPlayComponent implements OnInit {

  @Output() boutonClick = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.boutonClick.emit('click');
  }

}
