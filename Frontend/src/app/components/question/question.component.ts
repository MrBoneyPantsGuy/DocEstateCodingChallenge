import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void { }

  cancel() {
    this.dialogRef.close()
  }

  delete() {
    this.dialogRef.close(this.data);
  }
}
