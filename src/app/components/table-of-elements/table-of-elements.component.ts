import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement, PeriodicElementService } from '../../services/periodic-element.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'table-of-elements',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './table-of-elements.component.html',
  styleUrl: './table-of-elements.component.scss'
})
export class TableOfElementsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];
  clickedRows = new Set<PeriodicElement>();

  constructor(private elementService: PeriodicElementService) { }

  ngOnInit(): void {
    this.elementService.getElements().subscribe(data => {
      this.dataSource = data;
    });
  }

}