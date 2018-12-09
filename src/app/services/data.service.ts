import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { TICKETS} from '../tickets';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl:string = 'http://localhost:4200';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  public getTickets(): Observable<TICKETS[]> {
    return this.httpClient.get<TICKETS[]>(this.baseUrl + '/assets/tickets.json').pipe(
      catchError(this.handleError('getTickets', []))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`DataService: ${message}`);
  }
}
