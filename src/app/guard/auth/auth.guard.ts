import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const _OAuthService = inject(OAuthService);
  const router = inject(Router);

  if (!_OAuthService.hasValidAccessToken()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
