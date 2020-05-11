import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, AboutRoutingModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
