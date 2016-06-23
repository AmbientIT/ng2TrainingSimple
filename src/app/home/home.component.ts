import { Component, OnInit } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'home',
  template: require('./home.html')
})
export class HomeComponent{
  param: string = 'World';
  constructor() {}
}
