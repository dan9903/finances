import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../../interfaces/ILogin';
import { Observable } from 'rxjs';
import { API_URLS } from '../../constants/urls';
import { IRegistrationRequest, IRegistrationResponse } from '../../interfaces/IRegistration';
import { IRenewTokenRequest } from 'src/app/interfaces/IRenewToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login$(loginRequest: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      API_URLS.LOGIN,
      loginRequest
    );
  }

  signup$(registrationRequest: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(
      API_URLS.REGISTER,
      registrationRequest
    );
  }

  fogotPassword$(email: string): Observable<HttpHeaderResponse> {
    return this.http.put<HttpHeaderResponse>(
      API_URLS.FORGOT_PASSWORD,
      { email: email }
    );
  }

  renewToken$(renewRequest: IRenewTokenRequest): Observable<string> {
    return this.http.put<string>(
      API_URLS.RENEW_TOKEN,
      renewRequest
    )
  }

  logout$(username: string): Observable<HttpHeaderResponse> {
    return this.http.delete<HttpHeaderResponse>(
      API_URLS.LOGOUT,
      {
        body: {
          username: username
        }
      }
    );
  }
}
