import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (localStorage.getItem('Authorization')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('Authorization')
        }
      })
    }

    return next.handle(req);

  }
}
