import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  signinForm = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(private authService: AuthService) {

  }

  signIn() {
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.signin(this.signinForm.value).subscribe({
      next: () => {

      },
      error: ({error}) => {
        if (error.username || error.password) {
          this.signinForm.setErrors({ credentials: true });
        }
      }
    })
  }

}
