import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Property } from '../../models/property';
import { FormControl, Validators } from '@angular/forms';
import { noSpecialCharactersValidator, noWhitespaceValidator } from '../../utility/formValidators';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  property!: Property;

  constructor(public dialogRef: MatDialogRef<EditPropertyComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Property) { }

  descriptionControl = new FormControl('', [Validators.required, noWhitespaceValidator, noSpecialCharactersValidator]);
  zipCodeControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]);

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

  getDescriptionErrorMessage() {
    if (this.descriptionControl.hasError('required')) {
      return 'Description is required';
    }
    if (this.descriptionControl.hasError('whitespace')) {
      return 'Description cannot be blank or contain only whitespace characters';
    }
    if (this.descriptionControl.hasError('specialCharacters')) {
      return 'Description cannot contain special characters like /\\_*#';
    }
    return '';
  }

  getZipCodeErrorMessage() {
    if (this.zipCodeControl.hasError('required')) {
      return 'Zip Code is required';
    }
    if (this.zipCodeControl.hasError('pattern')) {
      return 'Zip Code is not valid';
    }
    return ''
  }

  // If either of these two Form Fields are not valid disable the save button with the returning boolean
  checkFormStatus() {
    return !(this.getDescriptionErrorMessage() === '' && this.getZipCodeErrorMessage() === '');
  }
}
