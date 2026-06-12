import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { AuthService } from "../service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        }
        // @ts-ignore
        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401 && !err.url.includes('/auth/token')) {
                    this.authService.logout(true);
                }
                const error = err.error.message || err.statusText;
                console.log("El error: ", err);
                return throwError(error);
            })
        );
    }
}
