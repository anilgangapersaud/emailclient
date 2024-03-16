import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from '../email-form/email-form.component';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  standalone: true,
  imports: [ModalComponent, CommonModule, EmailFormComponent],
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css'
})
export class EmailCreateComponent {

  email: Email;

  showModal = false;
  
  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${authService.username}@angular-email.com`
    }
  }

  onSubmit(email: Email) {
    console.log(email);
    this.emailService.sendEmail(email).subscribe((response) => {
      this.showModal = false;
    })
  }

}
