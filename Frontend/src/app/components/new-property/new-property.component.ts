import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {
  property!: Property;

  constructor(public dialogRef: MatDialogRef<NewPropertyComponent>) { }

  // TODO: Form Input Validation

  ngOnInit(): void {
    this.property = {
      id: '',
      description: '',
      address: {
        street: '',
        number: '',
        city: '',
        zipCode: '',
        state: ''
      }
    };
  }

  save(): void {
    this.dialogRef.close(this.property);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
