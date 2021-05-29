import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '@app-services/api.service';
import { ICar } from '@app-types/car';

@Component({
  selector: 'app-add-car-records',
  templateUrl: './add-car-records.component.html',
  styleUrls: ['./add-car-records.component.scss']
})
export class AddCarRecordsComponent implements OnInit {

  public carsForm: FormGroup = this.formBuilder.group({
    name: [''],
    brand: [''],
    color: [''],
    carModel: [''],
    year: [''],
    isUsed: ['']
  });
  public targetData: ICar;
  public isEditView: boolean;
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
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddCarRecordsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICar,
  ) {
    setTimeout(() => {
      if (data) {
        if(data['_id']) {
          this.isEditView = true;
        }

        if (data._id) {
          this.carsForm.patchValue({
            name: data.name,
            brand: data.brand,
            color: data.color,
            carModel: data.carModel,
            year: data.year,
            isUsed: data.isUsed
          }, { emitEvent: false })
        }
      }
    })
  }

  ngOnInit(): void {
  }

  public submit() {
    if (!this.carsForm.valid) {
      return;
    }

    const value: ICar = this.carsForm.value;

    if (this.isEditView) {
      this.editCar(this.data._id as string, value);
    } else {
      this.addCar(value);
    }
  }

  public addCar(requestPayload: ICar) {
    this.isReqPending = true;
    this.apiService.insertCar(requestPayload)
      .subscribe((res) => {
        this.matSnackBar.open(res.message, 'SUCCESS', { duration: 3000 })
        this.dialogRef.close(true);
        this.isReqPending = false;
      }, (err) => {
        this.dialogRef.close(false);
        this.isReqPending = false;
        const message = err.message || "";
        this.matSnackBar.open(message, 'ERROR', { duration: 3000 })
      })
  }

  public editCar(id: string, requestPayload: ICar) {
    this.isReqPending = true;
    this.apiService.updateCarById(id, requestPayload)
      .subscribe((res) => {
        this.matSnackBar.open(res.message, 'SUCCESS', { duration: 3000 })
        this.dialogRef.close(true);
        this.isReqPending = false;
      }, (err) => {
        this.dialogRef.close(false);
        this.isReqPending = false;
        const message = err.message || "";
        this.matSnackBar.open(message, 'ERROR', { duration: 3000 })
      })
  }

}
