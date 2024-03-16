import { Component } from '@angular/core';
import { EmailIndexComponent } from '../email-index/email-index.component';
import { EmailCreateComponent } from '../email-create/email-create.component';
import { PlaceholderComponent } from '../placeholder/placeholder.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, EmailIndexComponent, EmailCreateComponent, PlaceholderComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
