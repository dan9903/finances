import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpErrorResponseInterceptor } from "./http-error.interceptor";
// import { TokenInterceptor } from "./token-interceptor";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorResponseInterceptor, multi: true }
  // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
