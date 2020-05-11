import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { CredentialsService } from './credentials.service';
import { Logger } from '../@core/logger.service';
import { appAnimations } from '../animations';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from '../@core/until-destroyed';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: appAnimations,
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  isLoadingG = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.credentialsService.credentials) {
      this.authenticationService.logout().subscribe(() => {
        log.info('Logout');
      });
      this.credentialsService.setCredentials();
    }
  }

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (user) => {
          log.debug(`${user.fullName} successfully logged in`);
          this.router.navigate(
            [this.route.snapshot.queryParams.redirect || '/dashboard'],
            { replaceUrl: true }
          );
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }
  async loginWithGoogle() {
    // try {
    //   this.isLoadingG = true;
    //   const accountData = await this.authService.GoogleAuth();
    //   const login$ = this.authenticationService.loginWithGoogle(accountData.credential.idToken);
    //   login$
    //     .pipe(
    //       finalize(() => {
    //         this.loginForm.markAsPristine();
    //         this.isLoadingG = false;
    //       }),
    //       untilDestroyed(this)
    //     )
    //     .subscribe(
    //       (account) => {
    //         this.sharedAInfoService.sendAccount(account);
    //         this.router.navigate([this.route.snapshot.queryParams.redirect || '/all-projects'],
    // { replaceUrl: true });
    //       },
    //       (error) => {
    //         log.debug(error);
    //         this.error = error;
    //       }
    //     );
    // } catch (error) {
    //   log.error(error);
    //   this.isLoadingG = false;
    // }
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
