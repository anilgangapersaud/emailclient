import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {

  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter;

  emailForm: FormGroup;

  ngOnInit() {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      from: new FormControl({ value: from, disabled: true }),
      to: new FormControl(to, [Validators.required, Validators.email]),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    })
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    this.emailSubmit.emit(this.emailForm.getRawValue());
  }

}
