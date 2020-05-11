import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../@core/core.module';
import { SharedModule } from '../@shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
