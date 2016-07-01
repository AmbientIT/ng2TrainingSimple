import {Component, OnInit} from '@angular/core';
import {ITodo} from './todo/shared/todo.model';
import {TranslateService} from 'ng2-translate';


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
  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    let userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(userLang);
  }
}
