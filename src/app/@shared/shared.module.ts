import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderComponent } from './loader/loader.component';
import { BarComponent } from './bar/bar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, RouterModule],
  declarations: [LoaderComponent, BarComponent],
  exports: [LoaderComponent, BarComponent, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
