import { Component } from '@angular/core';
import { TableOfElementsComponent } from './components/table-of-elements/table-of-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableOfElementsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zadanie';
}
