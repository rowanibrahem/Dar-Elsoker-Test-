import { HttpInterceptorFn } from '@angular/common/http';

export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('_token') !== null) {
    const mytoken: any = {
      token: localStorage.getItem('_token'),
    };

    req = req.clone({
      setHeaders: mytoken,
    });
  }

  return next(req);
};
