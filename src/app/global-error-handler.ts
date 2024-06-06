import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('An error has ocurred ', error.message);
  }
}

export const genericErrorHandlingProviders = [
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
];
