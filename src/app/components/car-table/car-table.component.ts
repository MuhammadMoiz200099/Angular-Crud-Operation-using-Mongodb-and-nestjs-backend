import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { APP_CONSTANTS } from '@app-constants/app.constants';
import { ApiService } from '@app-services/api.service';
import { ICar } from '@app-types/car';
import { AddCarRecordsComponent } from 'src/app/entry-components/add-car-records/add-car-records.component';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {

  public isViewPending: boolean;
  public displayedColumns: Array<string> = ['name', 'brand', 'color', 'model', 'year', 'condition', 'action'];
  public dataSource = new MatTableDataSource<ICar>();
  public searchedName: string;
  public resultsLength: number;
  public pageEvent: PageEvent = {
    pageSize: APP_CONSTANTS.pageSize,
    pageIndex: 0,
    length: APP_CONSTANTS.pageSize
  }
  
  constructor( 
    private apiService: ApiService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) { 
    setTimeout(() => {
      this.intiUIData();
    });
  }

  ngOnInit(): void {
  }

  public intiUIData() {
    this.isViewPending = true;
    this.apiService.getAllCars(this.pageEvent, this.searchedName).subscribe((res) => {
      this.dataSource.data = res.data.rows;
      this.resultsLength = res.data.total_size;
      this.isViewPending = false;
    }, (err) => {
      this.isViewPending = false;
      const message = err.message || 'Error Fetching Records';
      this.matSnackBar.open(message, 'ERROR', { duration: 3000 });
    });
  }

  public onSearch(text: string) {
    this.searchedName = text;
    this.intiUIData();
  }

  public onPageChange(page: PageEvent) {
    this.pageEvent = page;
    this.intiUIData();
  }

  public deleteCarRecord(id: number) {
    this.apiService.deleteCarByID(id).subscribe(() => {
      this.matSnackBar.open('Record Deleted Successfully', 'SUCCESS', { duration: 3000 });
      this.intiUIData();
    }, (err) => {
      const message = err.message || 'Error Deleting Records';
      this.matSnackBar.open(message, 'ERROR', { duration: 3000 });
    })
  }

  public addNewRecord() {
    this.matDialog.open<AddCarRecordsComponent>(AddCarRecordsComponent, {
      width: '600px'
    })
    .afterClosed().subscribe((result) => {
      console.log(result);
    })
  }

}
