import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement, PeriodicElementService } from '../../services/periodic-element.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditElementPopupComponent } from '../edit-element-popup/edit-element-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'table-of-elements',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule, EditElementPopupComponent, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table-of-elements.component.html',
  styleUrl: './table-of-elements.component.scss'
})
export class TableOfElementsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>([]);
  readonly dialog = inject(MatDialog);

  constructor(private elementService: PeriodicElementService) { }

  ngOnInit(): void {
    this.elementService.getElements().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  openDialog(row: PeriodicElement) {
    const dialogRef = this.dialog.open(EditElementPopupComponent, { data: { ...row } });

    dialogRef.afterClosed().subscribe((result: PeriodicElement | undefined) => {
      if (result) {
        Object.keys(result).forEach((key) => {
          const typeKey = key as keyof PeriodicElement;

          if (row[typeKey] !== result[typeKey]) {
            (row[typeKey] as PeriodicElement[keyof PeriodicElement]) = result[typeKey];
          }
        })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}