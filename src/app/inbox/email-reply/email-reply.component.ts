import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EmailFormComponent } from '../email-form/email-form.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { Subject, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-email-reply',
  standalone: true,
  imports: [CommonModule, EmailFormComponent, ModalComponent],
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css'
})
export class EmailReplyComponent {

  @Input() email: Email;
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n> ');

    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re:${this.email.subject}`,
      text: `\n\n\n------- ${this.email.from} wrote:\n> ${text}`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe((response) => {
      this.showModal = false;
    })
  }
}
