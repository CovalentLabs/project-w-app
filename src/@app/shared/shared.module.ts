import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// import { InterestBlockComponent } from './interest-block/interest-block.component';
// import { CtaButtonComponent } from './cta-button/cta-button.component'

// Components that live in multiple places around the app go here.
// Examples may include: pw-button, pw-input, pw-carousel, etc.

// See https://angular.io/docs/ts/latest/guide/ngmodule.html#!#cleanup

// from Angular 2 ngmodule guide:
// Do not specify app-wide singleton providers in a shared module.
// A lazy loaded module that imports that shared module will make
// its own copy of the service.

import { CelebrationModalComponent } from './celebration-modal/celebration-modal.component';
import { AutoGrowDirective } from './auto-grow.directive';

// import { AwesomePipe }         from './awesome.pipe';
// import { HighlightDirective }  from './highlight.directive';
@NgModule({
  imports:      [ CommonModule ],
  declarations: [ CelebrationModalComponent, AutoGrowDirective ],
  exports:      [ CelebrationModalComponent, AutoGrowDirective, CommonModule, ReactiveFormsModule, FormsModule ]
})
export class SharedModule { }
