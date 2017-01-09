import { Component } from '@angular/core'
import { Routes } from '@angular/router'

import { StyleguideComponent } from './styleguide.component'
import { TestComponent } from './test.component'


export const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: StyleguideComponent },
]
export const DECLARATIONS = routes
  .filter(r => !!r.component)
  .map(r => r.component)
