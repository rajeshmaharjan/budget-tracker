import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "src/app/shared/shared.module";

import { FooterComponent, HeaderComponent } from './components';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }
