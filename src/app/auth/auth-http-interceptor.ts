import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpEventType } from "@angular/common/http";
import { Observable, filter, tap } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Modify or log the outgoing request
        const modifiedReq = req.clone({
            withCredentials: true
        })
        return next.handle(modifiedReq);
    }
}
