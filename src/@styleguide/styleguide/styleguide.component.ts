import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'

import { ActivatedRoute } from '@angular/router'

import { AppStateService, AppState } from '@app/core'

import { Subscription } from 'rxjs'

@Component({
  // Nunjucks now available for templating
  template: require('./styleguide.component.html'),
  styles: [
    require('@app/style/component/full.scss'),
    // Styles should be minimal and only specific to the Styleguide component.
    // But for now, while developing put styles in here until we know how to
    // integrate those changes into bootstrap custom.
    require('./styleguide.component.scss'),
  ]
})
export class StyleguideComponent implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription
  private _paramsSub: Subscription

  constructor(
      private _app: AppStateService,
      private _route: ActivatedRoute,
      private _ref: ElementRef) {
    this._stateSub = this._app.state.subscribe(
        appState => {
      this.AppState = appState
    })
    this._paramsSub = this._route.params.subscribe(
        params => {
      console.log('Styleguide params:', params)
    })
  }

  ngOnInit() {
    // trigger update so AppState becomes set.
    this._app.next()

    // Set up -----------------
    // jQuery of the :host element of our template.
    const ref = $(this._ref.nativeElement)

    // Tooltips ---------------
    const tooltipped = ref.find('[data-toggle="tooltip"]')
    // Creating a Bootstrap tooltip!
    tooltipped.tooltip()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
    this._paramsSub.unsubscribe()
  }
}
