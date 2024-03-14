import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() label = '';
  @Input() control: any;

  showErrors() {
    if (this.control != undefined && this.control.errors != null && !isObservable(this.control.errors)) {
      const { dirty, touched, errors } = this.control;
      return dirty && touched && errors;
    }
  }
}
