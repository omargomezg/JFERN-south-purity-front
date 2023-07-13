import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  names?: string;
  lastName?: string;
  email?: string;
  telephone?: string;
  message?: string;

  send(): void {

  }
}
