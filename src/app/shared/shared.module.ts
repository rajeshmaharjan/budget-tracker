import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmationModalComponent, SvgIconComponent } from './components';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    SvgIconComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SvgIconComponent,
  ],
})
export class SharedModule { }
