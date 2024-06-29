import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private _Router: Router, private oauthService: OAuthService) {
    // this.configure();
  }

  // configure() {
  //   this.oauthService.configure(authCodeFlowConfig);
  //   this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  login() {
    // this.oauthService.initImplicitFlow();
    this._Router.navigate(['/dashboard']);
  }
}
