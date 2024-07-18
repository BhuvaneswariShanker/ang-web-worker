import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Angular Web Worker";
  factorialResult!: number;
  factorialInput: number = 1;

  constructor() {
    this.calculateFactorial();
  }

  calculateFactorial() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('../webworker/webworker.worker.ts', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.factorialResult = data;
      };
      worker.postMessage(this.factorialInput);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log('Web Workers are not supported in this environment.');
    }
  }
}
