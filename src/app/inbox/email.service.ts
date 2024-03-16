import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from './email';

interface EmailSummary {
  id: string,
  subject: string;
  from: string;
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  rootUrl = "https://api.angular-email.com";

  constructor(private client: HttpClient) { }

  getEmails(): Observable<EmailSummary[]> {
    return this.client.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmailById(emailId: string): Observable<Email> {
    return this.client.get<Email>(`${this.rootUrl}/emails/${emailId}`);
  }

  sendEmail(email: Email) {
    return this.client.post(`${this.rootUrl}/emails`, {
      to: email.to,
      subject: email.subject,
      text: email.text
    });
  }
}
