import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allStocks: Observable<{
    symbol: string;
    name: string;
    price: number;
  }[]>;

  private readonly allStocksDocument = gql`
    query allStocks {
      allStocks {
        symbol
        name
        price
      }
    }
  `;


  constructor(readonly apollo: Apollo) {
    this.allStocks = apollo.query<{
      allStocks: {
        symbol: string;
        name: string;
        price: number;
      }[]
    }>({
      query: this.allStocksDocument
    }).pipe(map(response => response.data.allStocks));
  }
}
