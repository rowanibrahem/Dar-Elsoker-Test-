import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  JwksValidationHandler,
  OAuthService,
} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
  
})
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'https://outh.ebdaa-business.com/realms/dar-elsokar',
    tokenEndpoint:
      'https://outh.ebdaa-business.com/realms/dar-elsokar/protocol/openid-connect/token',
    redirectUri: window.location.origin,
    clientId: 'dar-elsokar-frontend',
    responseType: 'code',
    scope: 'openid profile',
  };

  login() {
    this.oauthService.initCodeFlow();
  }

  async configure(): Promise<void> {
    this.oauthService.configure(this.authConfig as AuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
    this.router.navigateByUrl('/dashboard');
  }
}
