import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AuthConfig,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { myhttpInterceptor } from './interceptors/myhttp.interceptor';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/dar-elsoker',
  tokenEndpoint:
    'http://localhost:8080/realms/dar-elsoker/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'dar-elsoker-frontend',
  responseType: 'code',
  scope: 'openid profile',
};

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([myhttpInterceptor])),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        };
      },
      multi: true,
      deps: [OAuthService],
    },
  ],
};
