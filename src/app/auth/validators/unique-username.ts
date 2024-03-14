import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername {

    constructor(private authService: AuthService) {}

    validate(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return this.authService.usernameAvailable(control.value)
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
}
