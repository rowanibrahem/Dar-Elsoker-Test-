import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
  const oAuthService = inject(OAuthService);

  if (oAuthService.getAccessToken() && localStorage.getItem('_token')) {
    const mytoken: any = {
      token: localStorage.getItem('_token'),
    };
    req = req.clone({
      setHeaders: mytoken,
    });
  }

  return next(req);
};
