import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);

  return oauthService.hasValidAccessToken()
    ? Promise.resolve(true)
    : Promise.reject(
        new Error('Access token not found. Redirecting to login...')
      ).then(() => router.navigate(['/login']));
};
