import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: [
    require('./app.css')
  ],
  template: require('./app.html'),
  directives: [
    NavbarComponent,
    ROUTER_DIRECTIVES
  ]
})
export class App implements OnInit{
  param: string = 'World';
  constructor(translate: TranslateService) {
    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

     // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
  ngOnInit() {
    console.log('App started');
  }
}
