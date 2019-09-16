import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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

  searchFormControl = new FormControl();
  searchResult: {
    symbol: string;
    name: string;
    price: number;
  };

  private readonly allStocksDocument = gql`
    query allStocks {
      allStocks {
        symbol
        name
        price
      }
    }
  `;

  private readonly stockDocument = gql`
    query stock($input:StockInput!) {
      stock(input: $input) {
        symbol
        price
        name
      }
    }
  `;


  constructor(private readonly apollo: Apollo) {
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

  search() {
    this.apollo.query<{
      stock: {
        symbol: string;
        name: string;
        price: number;
      }
    }>({
      query: this.stockDocument,
      variables: {
        input: {
          symbol: this.searchFormControl.value
        }
      }
    }).subscribe(result => {
      this.searchResult = result.data.stock;
    });
  }
}
