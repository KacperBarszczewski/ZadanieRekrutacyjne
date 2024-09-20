import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement, PeriodicElementService } from '../../services/periodic-element.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditElementPopupComponent } from '../edit-element-popup/edit-element-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, tap } from 'rxjs';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'table-of-elements',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule, EditElementPopupComponent, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table-of-elements.component.html',
  styleUrl: './table-of-elements.component.scss',
  providers: [RxState]
})
export class TableOfElementsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>();
  filterSubject: Subject<string> = new Subject<string>();
  readonly dialog = inject(MatDialog);
  readonly state = inject(RxState<TableOfElementsComponent>);

  constructor(private elementService: PeriodicElementService) { }

  ngOnInit(): void {
    this.state.connect('dataSource', this.elementService.getElements().pipe(
      tap(data => this.dataSource = new MatTableDataSource(data))
    ));

    this.state.connect('filter', this.filterSubject.pipe(
      debounceTime(2000),
      tap(filterValue => this.dataSource.filter = filterValue.trim().toLowerCase())
    ));
  }

  openDialog(row: PeriodicElement) {
    const dialogRef = this.dialog.open(EditElementPopupComponent, {
      height: '300px',
      width: '80vw',
      data: { ...row }
    });

    this.state.hold(dialogRef.afterClosed(), (result: PeriodicElement | undefined) => {
      if (result) {
        //Object.assign(row, result);
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
    this.filterSubject.next(filterValue);
  }

}