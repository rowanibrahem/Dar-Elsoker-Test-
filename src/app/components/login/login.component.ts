import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
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
  constructor(private _Router: Router, private oauthService: OAuthService) {}

  login() {
    //   this.oauthService.configure(authCodeFlowConfig);
    //   this.oauthService.setupAutomaticSilentRefresh();
    //   this.oauthService.loadDiscoveryDocumentAndLogin();
    this._Router.navigate(['/dashboard']);
  }
}
