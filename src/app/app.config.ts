import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  AuthConfig,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';
import { myhttpInterceptor } from './interceptors/http/myhttp.interceptor';
import { loaderInterceptor } from './interceptors/loader/loader.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

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
    provideAnimations(),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(),
    provideHttpClient(withInterceptors([myhttpInterceptor, loaderInterceptor])),
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
    provideNzI18n(en_US)
  ],
};
