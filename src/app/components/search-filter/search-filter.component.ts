import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchText = new FormControl('');

  constructor() {

    this.searchText.valueChanges.subscribe((value) => {
      this.onSearch.emit(value);
    })
  }

  ngOnInit(): void {
  }


}
