import { Component, Input, HostBinding } from '@angular/core'

@Component({
  selector: 'pw-vitre',
  template: `<ng-content></ng-content>`,
})
export class VitreComponent {
  DEFAULT_COL_SIZE = 12
  DEFAULT_ROW_SIZE = 12
  @HostBinding('style.width') styleWidth
  @HostBinding('style.height') styleHeight
  @HostBinding('style.touchAction') touchAction = 'none'
  // <vitre [backgroundColor]="">
  @Input() @HostBinding('style.backgroundColor') backgroundColor: string
  @Input('vitre-name') name: string = Math.random().toString(32)

  set width(widthValue: string) {
    this.styleWidth = widthValue
  }
  set height(heightValue: string) {
    this.styleHeight = heightValue
  }

  @Input('vitre-col')    protected _col: string
  @Input('vitre-col-sm') protected _colSm: string
  @Input('vitre-col-md') protected _colMd: string
  @Input('vitre-col-lg') protected _colLg: string
  @Input('vitre-col-xl') protected _colXl: string
  @Input('vitre-row')    protected _row: string
  @Input('vitre-row-sm') protected _rowSm: string
  @Input('vitre-row-md') protected _rowMd: string
  @Input('vitre-row-lg') protected _rowLg: string
  @Input('vitre-row-xl') protected _rowXl: string

  get col(): number { return parseFloat(this._col) || this.DEFAULT_COL_SIZE }
  get colSm(): number { return parseFloat(this._colSm || this._col) || this.DEFAULT_COL_SIZE  }
  get colMd(): number { return parseFloat(this._colMd || this._colSm || this._col) || this.DEFAULT_COL_SIZE  }
  get colLg(): number { return parseFloat(this._colLg || this._colMd || this._colSm || this._col) || this.DEFAULT_COL_SIZE  }
  get colXl(): number { return parseFloat(this._colXl || this._colLg || this._colMd || this._colSm || this._col) || this.DEFAULT_COL_SIZE  }
  get row(): number { return parseFloat(this._row) || this.DEFAULT_ROW_SIZE }
  get rowSm(): number { return parseFloat(this._rowSm || this._row) || this.DEFAULT_ROW_SIZE  }
  get rowMd(): number { return parseFloat(this._rowMd || this._rowSm || this._row) || this.DEFAULT_ROW_SIZE  }
  get rowLg(): number { return parseFloat(this._rowLg || this._rowMd || this._rowSm || this._row) || this.DEFAULT_ROW_SIZE  }
  get rowXl(): number { return parseFloat(this._rowXl || this._rowLg || this._rowMd || this._rowSm || this._row) || this.DEFAULT_ROW_SIZE  }

  getCol(view?: string): number {
    switch (view) {
      case 'sm': return this.colSm;
      case 'md': return this.colMd;
      case 'lg': return this.colLg;
      case 'xl': return this.colXl;
      default: return this.col;
    }
  }
  getRow(view?: string): number {
    switch (view) {
      case 'sm': return this.rowSm;
      case 'md': return this.rowMd;
      case 'lg': return this.rowLg;
      case 'xl': return this.rowXl;
      default: return this.row;
    }
  }
}
