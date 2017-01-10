import { Component, Input } from '@angular/core'

@Component({
  selector: 'pw-vitre',
  template: require('./vitre.component.html'),
  styles: [
    require('./vitre.component.scss'),
  ]
})
export class VitreComponent {
  // <vitre [backgroundColor]="">
  @Input() backgroundColor: string

  @Input('vitre-col')    protected _col: string
  @Input('vitre-col-sm') protected _colSm: string
  @Input('vitre-col-md') protected _colMd: string
  @Input('vitre-col-lg') protected _colLg: string
  @Input('vitre-col-xl') protected _colXl: string
  get col(): number { return parseFloat(this._col) }
  get colSm(): number { return parseFloat(this._colSm || this._col) }
  get colMd(): number { return parseFloat(this._colMd || this._colSm || this._col) }
  get colLg(): number { return parseFloat(this._colLg || this._colMd || this._colSm || this._col) }
  get colXl(): number { return parseFloat(this._colXl || this._colLg || this._colMd || this._colSm || this._col) }

  getCol(view?: string): number {
    switch (view) {
      case 'sm': return this.colSm;
      case 'md': return this.colMd;
      case 'lg': return this.colLg;
      case 'xl': return this.colXl;
      default: return this.col;
    }
  }
}
