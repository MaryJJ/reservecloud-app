import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';

import { ShellComponent } from './shell.component';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from '../auth/authentication.service';
import { MockAuthenticationService } from '../auth/authentication.service.mock';
import { CredentialsService } from '../auth/credentials.service';
import { MockCredentialsService } from '../auth/credentials.service.mock';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CredentialsService, useClass: MockCredentialsService },
      ],
      declarations: [ShellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
