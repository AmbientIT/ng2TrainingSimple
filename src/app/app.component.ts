import {Component, OnInit} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: [
    require('./app.css')
  ],
  template: require('./app.html')
})
export class App implements OnInit{
  constructor() {}

  ngOnInit() {

  }
}
