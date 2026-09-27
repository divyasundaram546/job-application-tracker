import { Component, signal } from '@angular/core';
import { ApplicationListComponent } from './application-list/application-list.component';

@Component({
  imports: [ApplicationListComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
