import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { TICKETS} from '../tickets';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() tickets: TICKETS[];
  @Output() filteredTickets = new EventEmitter<number[]>();

  private stops: Array<number>;
  private currentValue: number[];
  constructor( private formBuilder: FormBuilder) { }

  ngOnChanges( changes: SimpleChanges) {
    this.currentValue = changes['tickets'].currentValue;
    if (this.currentValue) {
      this.arrayOfStops();
    }
    console.log(this.stops);
  }
  ngOnInit() {

  }
  arrayOfStops() {
    const stops = new Set();
    this.stops = this.currentValue.filter(item => {
      if (stops.has(item['stops'])) {
        return false;
      }
      stops.add(item['stops']);
      return true;
    }).map( item => item['stops']);
  }

}
