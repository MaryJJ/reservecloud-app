import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './shell.component';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../@shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, AuthModule, RouterModule],
  declarations: [ShellComponent],
})
export class ShellModule {}
