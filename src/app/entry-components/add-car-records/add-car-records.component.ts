import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-records',
  templateUrl: './add-car-records.component.html',
  styleUrls: ['./add-car-records.component.scss']
})
export class AddCarRecordsComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({
    name: [''],
    brand: [''],
    color: [''],
    car_model: [''],
    year: [''],
    condition: ['']
  });
  public isReqPending: boolean;
  public conditions: Array<any> = [
    {
      name: 'used car',
      value: true
    },
    {
      name: 'brand new car',
      value: false
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCarRecordsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
  }

  public submit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.dialogRef.close(true);
  }
}
