import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { TICKETS} from '../tickets';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnChanges {
  tickets: TICKETS[];
  constructor( private dataService: DataService) { }
  ngOnChanges(changes: SimpleChanges){

  }
  ngOnInit() {
    this.getTickets();
  }
  getTickets(): void {
    this.dataService.getTickets().subscribe(
      data => {
        this.tickets = data['tickets'].filter( item => [2, 1].indexOf(item['stops']) !== -1);

        console.log(this.tickets.sort((a, b) => a['price'] - b['price']));
      }

    );
  }

}
