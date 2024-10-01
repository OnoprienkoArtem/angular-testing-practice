import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  standalone: true,
  template: `<div data-testing="message-container">{{ message }}</div>`,
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong';
}
