import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);
  const token = localStorage.getItem('_token');

  if (oauthService.getAccessToken() && token) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
