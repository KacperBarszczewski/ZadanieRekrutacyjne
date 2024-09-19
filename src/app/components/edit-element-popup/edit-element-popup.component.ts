import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../../services/periodic-element.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'edit-element-popup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule,
  ],
  templateUrl: './edit-element-popup.component.html',
  styleUrl: './edit-element-popup.component.scss'
})
export class EditElementPopupComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  readonly dialogRef = inject(MatDialogRef<EditElementPopupComponent>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

}
