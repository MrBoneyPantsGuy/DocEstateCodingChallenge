import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Property } from '../../models/property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  property!: Property;

  constructor(public dialogRef: MatDialogRef<EditPropertyComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Property) { }

  // TODO: Form Input Validation

  ngOnInit(): void {
    // clone the Property Object
    this.property = (JSON.parse(JSON.stringify(this.data)));
  }

  save(): any {
    this.dialogRef.close(this.property);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
