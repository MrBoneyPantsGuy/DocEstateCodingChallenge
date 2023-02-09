import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { noSpecialCharactersValidator, noWhitespaceValidator } from '../../utility/formValidators';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.css']
})
export class NewPropertyComponent implements OnInit {
  property!: Property;

  constructor(public dialogRef: MatDialogRef<NewPropertyComponent>) { }

  descriptionControl = new FormControl('', [Validators.required, noWhitespaceValidator, noSpecialCharactersValidator]);
  zipCodeControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]);

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
    // @ts-ignore
    delete this.property.id;
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

  checkFormStatus() {
    return !(this.getDescriptionErrorMessage() === '' && this.getZipCodeErrorMessage() === '');
  }
}
