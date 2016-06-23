import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Subscription} from 'rxjs/Rx';

interface LanguageI {
  value: string;
  label: string;
}

@Component({
  selector: 'navbar',
  template: require('./navbar.html'),
  directives: [
    ROUTER_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ]
})
export class NavbarComponent implements OnInit, OnDestroy{
  languagesForm: FormGroup;
  subscription: Subscription;
  languages: LanguageI[] = [
    {
      value: 'en',
      label: 'ENGLISH'
    },
    {
      value: 'fr',
      label: 'FRENCH'
    }
  ]

  constructor(private formBuilder: FormBuilder, private translate: TranslateService) {}

  ngOnInit() {
    this.languagesForm = this.formBuilder.group({
      locale: ['fr']
    })

    this.subscription = this.languagesForm.valueChanges
      .map((form) => form.locale)
      .subscribe((locale) => this.translate.use(locale))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
