import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, catchError, of, throwError } from "rxjs";
import { HTTP_CODES } from "../constants/http-codes";

@Injectable()
export class HttpErrorResponseInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (
            error.status === HTTP_CODES.NETWORK_ISSUE ||
            error.status === HTTP_CODES.INTERNAL_SERVER_ERROR ||
            error.status === HTTP_CODES.NETWORK_ISSUE ||
            error.status === HTTP_CODES.SERVICE_UNAVAILABLE
          ) {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong, try again later... ',
              detail: 'Looks like we are having problems with the server '
            });
            return of();
          }
          return throwError(() => error);
        })
      );
  }
}

