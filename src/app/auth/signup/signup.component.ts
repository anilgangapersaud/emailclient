import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  authForm = new FormGroup({
    username: new FormControl('', 
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate()]),
    password: new FormControl('', 
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', 
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, 
  { validators: [this.passwordMatcher.validate()] } 
  );

  constructor(
    private passwordMatcher: MatchPassword,
    private uniqueUsername: UniqueUsername) {
  }

}
