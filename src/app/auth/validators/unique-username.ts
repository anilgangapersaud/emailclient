import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class UniqueUsername {

    constructor(private httpClient: HttpClient) {}

    validate(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return this.httpClient.post<any>('https://api.angular-email.com/auth/username', {
                username: control.value
            })
            .pipe(
                map(() => {
                    return Observable<null>;
                }),
                catchError((err) => {
                    if (err.error.username) {
                        return of({ nonUniqueUsername: true });
                    } else {
                        return of({ noConnection: true })
                    }
                })
            )
        }
    }

    checkUsername(username: string) {
        return this.httpClient.post('https://api.angular-email.com/auth/username',
        {
            username: username
        });
    }

}
