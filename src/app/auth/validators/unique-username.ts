import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService) {}

    validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return this.authService.usernameAvailable(control.value)
        .pipe(
            map(() => {
                return null;
            }),
            catchError((err) => {
                if (err.error.username) {
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true })
                }
            })
        )
    }
}
